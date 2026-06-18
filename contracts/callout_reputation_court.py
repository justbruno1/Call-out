# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *

from datetime import datetime, timezone


VALID = "valid"
INVALID = "invalid"
INCONCLUSIVE = "inconclusive"

OPEN = "open"
DEFENDED = "defended"
REVIEWED = "reviewed"
FINALIZED = "finalized"

DEFENSE_WINDOW_SECONDS = 3 * 24 * 60 * 60


class CalloutReputationCourt(gl.Contract):
    cases: DynArray[str]
    cases_by_accused: TreeMap[str, str]

    filer: TreeMap[str, str]
    accused: TreeMap[str, str]
    accused_entity: TreeMap[str, str]
    status: TreeMap[str, str]
    verdict: TreeMap[str, str]
    appeal_status: TreeMap[str, str]

    accusation: TreeMap[str, str]
    defense: TreeMap[str, str]
    evidence_links: TreeMap[str, str]
    defense_evidence_links: TreeMap[str, str]

    filing_bond: TreeMap[str, str]
    defense_bond: TreeMap[str, str]

    created_at: TreeMap[str, str]
    defense_deadline: TreeMap[str, str]
    resolved_at: TreeMap[str, str]
    reasoning: TreeMap[str, str]

    def __init__(self):
        pass

    @gl.public.write
    def create_case(self, accused_address: str, accused_entity: str, accusation: str, evidence_links: str) -> str:
        if len(accusation.strip()) == 0:
            raise gl.vm.UserError("accusation required")
        if len(accused_entity.strip()) == 0:
            raise gl.vm.UserError("accused entity required")
        if len(evidence_links.strip()) == 0:
            raise gl.vm.UserError("evidence link required")
        if accused_address == str(gl.message.sender_address):
            raise gl.vm.UserError("cannot accuse yourself")

        case_id = str(len(self.cases) + 1)
        now = int(datetime.now(timezone.utc).timestamp())

        self.cases.append(case_id)
        self.filer[case_id] = str(gl.message.sender_address)
        self.accused[case_id] = accused_address
        self.accused_entity[case_id] = accused_entity
        self.status[case_id] = OPEN
        self.verdict[case_id] = ""
        self.appeal_status[case_id] = "none"
        self.accusation[case_id] = accusation
        self.defense[case_id] = ""
        self.evidence_links[case_id] = evidence_links
        self.defense_evidence_links[case_id] = ""
        self.filing_bond[case_id] = "not_collected"
        self.defense_bond[case_id] = "not_collected"
        self.created_at[case_id] = datetime.now(timezone.utc).isoformat()
        self.defense_deadline[case_id] = str(now + DEFENSE_WINDOW_SECONDS)
        self.resolved_at[case_id] = ""
        self.reasoning[case_id] = ""

        if accused_address not in self.cases_by_accused:
            self.cases_by_accused[accused_address] = case_id
        else:
            self.cases_by_accused[accused_address] += "," + case_id

        return case_id

    @gl.public.write
    def add_defense(self, case_id: str, defense: str, defense_evidence_links: str) -> str:
        self._require_case(case_id)
        if self.status[case_id] != OPEN:
            raise gl.vm.UserError("case not open for defense")
        if str(gl.message.sender_address) != self.accused[case_id]:
            raise gl.vm.UserError("only accused may defend")
        if len(defense.strip()) == 0:
            raise gl.vm.UserError("defense required")

        self.status[case_id] = DEFENDED
        self.defense[case_id] = defense
        self.defense_evidence_links[case_id] = defense_evidence_links
        self.defense_bond[case_id] = "not_collected"
        return self.status[case_id]

    @gl.public.write
    def review_case(self, case_id: str) -> str:
        self._require_case(case_id)
        if self.status[case_id] not in (OPEN, DEFENDED):
            raise gl.vm.UserError("case not ready for review")

        now = int(datetime.now(timezone.utc).timestamp())
        if self.status[case_id] == OPEN and now <= int(self.defense_deadline[case_id]):
            raise gl.vm.UserError("defense window still open")

        prompt = self._review_prompt(self._case_packet_for_ai(case_id))

        def evaluate_case():
            # GenLayer primitive: gl.nondet.exec_prompt performs the AI review.
            # LLM calls are non-deterministic, so this function is passed to an
            # equivalence-principle helper instead of being called directly.
            return gl.nondet.exec_prompt(
                prompt,
                response_format="json",
            )

        # GenLayer equivalence primitive: prompt_comparative asks validators to
        # independently produce a result and compare it with the leader using
        # the EqComparative template. The verdict must match exactly while the
        # natural-language reasoning may differ.
        result = gl.eq_principle.prompt_comparative(
            evaluate_case,
            principle=(
                "`verdict` must be exactly the same and must be one of "
                "'valid', 'invalid', or 'inconclusive'. `reasoning` may differ "
                "but must support the same verdict from the supplied evidence."
            ),
        )
        if not is_valid_ai_result(result):
            raise gl.vm.UserError("invalid AI verdict")

        self.verdict[case_id] = result["verdict"]
        self.reasoning[case_id] = result.get("reasoning", "")
        self.status[case_id] = REVIEWED

        return self.verdict[case_id]

    @gl.public.write
    def finalize_verdict(self, case_id: str) -> None:
        self._require_case(case_id)
        if self.status[case_id] != REVIEWED:
            raise gl.vm.UserError("case has no reviewed verdict")
        if self.verdict[case_id] not in (VALID, INVALID, INCONCLUSIVE):
            raise gl.vm.UserError("case has invalid verdict")

        self.status[case_id] = FINALIZED
        self.resolved_at[case_id] = datetime.now(timezone.utc).isoformat()

    @gl.public.write
    def mark_appealed(self, case_id: str, appeal_status: str) -> None:
        self._require_case(case_id)
        if self.status[case_id] != FINALIZED:
            raise gl.vm.UserError("only finalized cases can be appealed")
        if appeal_status not in ("requested", "accepted", "rejected", "final"):
            raise gl.vm.UserError("invalid appeal status")
        self.appeal_status[case_id] = appeal_status

    @gl.public.view
    def list_cases(self) -> DynArray[str]:
        return self.cases

    @gl.public.view
    def get_cases_by_accused(self, accused_address: str) -> str:
        return self.cases_by_accused.get(accused_address, "")

    def _case_packet_for_ai(self, case_id: str) -> TreeMap[str, str]:
        return {
            "case_id": case_id,
            "filer": self.filer[case_id],
            "accused": self.accused[case_id],
            "accused_entity": self.accused_entity[case_id],
            "accusation": self.accusation[case_id],
            "defense": self.defense[case_id],
            "evidence_links": self.evidence_links[case_id],
            "defense_evidence_links": self.defense_evidence_links[case_id],
            "created_at": self.created_at[case_id],
        }

    def _review_prompt(self, case_packet: TreeMap[str, str]) -> str:
        return f"""
You are an impartial GenLayer validator for Callout, an on-chain reputation court.

Review the accusation, evidence links, accused entity, filer, and any defense.
Return exactly one verdict:
- "{VALID}" when the evidence supports the accusation.
- "{INVALID}" when the evidence does not support it or the defense rebuts it.
- "{INCONCLUSIVE}" when the record is insufficient or mixed.

Use only the supplied case packet. Do not invent facts. Absence of defense is not
automatic guilt.

Case packet:
{case_packet}

Return JSON with this exact shape:
{{
  "verdict": "valid | invalid | inconclusive",
  "reasoning": "short evidence-grounded explanation"
}}
""".strip()

    def _require_case(self, case_id: str) -> None:
        if case_id not in self.status:
            raise gl.vm.UserError("case not found")


def is_valid_ai_result(result) -> bool:
    return (
        isinstance(result, dict)
        and result.get("verdict") in (VALID, INVALID, INCONCLUSIVE)
        and isinstance(result.get("reasoning"), str)
        and len(result["reasoning"].strip()) > 0
    )
