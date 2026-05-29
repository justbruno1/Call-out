"""
Callout Reputation Court — GenLayer Intelligent Contract Concept
================================================================

This file is a conceptual GenLayer Intelligent Contract for the Callout
reputation court system. It is written in Python using GenLayer's
Intelligent Contract patterns.

GenLayer Intelligent Contracts extend traditional smart contracts with
the ability to run AI-based analysis through validator consensus.
Validators each independently run the AI prompt and reach conclusions;
consensus determines the final on-chain result.

To adapt for production:
- Replace mock imports with actual GenLayer SDK imports
- Register the contract on the GenLayer network
- Replace frontend mock calls with real SDK contract calls
- Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env with the deployed address

Reference: https://docs.genlayer.io
"""

from typing import Optional
import json
from datetime import datetime, timedelta

# ─── GenLayer imports ────────────────────────────────────────────────────────
# In a real GenLayer contract, you would import from the GenLayer SDK.
# The exact import paths may differ; refer to current GenLayer documentation.
#
# Example (adapt based on actual SDK):
# from genlayer import Contract, public, view, call_llm, get_block_time
# from genlayer.storage import Storage
#
# For this concept file, we mock the core primitives below.

class Contract:
    """Base GenLayer contract class (mocked for concept)."""
    pass

def public(fn):
    """Marks a function as a public contract method (mocked)."""
    return fn

def view(fn):
    """Marks a function as a read-only view (mocked)."""
    return fn

def call_llm(prompt: str, temperature: float = 0.0) -> str:
    """
    Calls the GenLayer AI validator layer with the given prompt.
    Validators independently run this and reach consensus.
    (Mocked for concept — real implementation via GenLayer SDK.)
    """
    raise NotImplementedError("Replace with actual GenLayer validator call.")


# ─── Data structures ─────────────────────────────────────────────────────────

class CaseStatus:
    AWAITING_DEFENSE = "Awaiting Defense"
    DEFENSE_SUBMITTED = "Defense Submitted"
    UNDER_REVIEW = "Under GenLayer Review"
    UNCONTESTED_REVIEW = "Uncontested Review"
    VERDICT_ISSUED = "Verdict Issued"
    ON_RECORD = "On Record"
    CLEARED = "Cleared"


class VerdictType:
    CLAIM_VALID = "Claim Valid"
    CLAIM_INVALID = "Claim Invalid"
    INCONCLUSIVE = "Inconclusive"
    NEEDS_MORE_EVIDENCE = "Needs More Evidence"
    MALICIOUS_FILING = "Malicious Filing"
    CLAIM_VALID_UNCONTESTED = "Claim Valid — Uncontested"


class CaseCategory:
    RUG_PULL = "Rug pull"
    FAKE_CLAIMS = "Fake claims"
    STOLEN_FUNDS = "Stolen funds"
    UNDELIVERED_WORK = "Undelivered work"
    IMPERSONATION = "Impersonation"
    SUSPICIOUS_ACTIVITY = "Suspicious wallet activity"
    GOVERNANCE_ABUSE = "Governance abuse"
    OTHER = "Other misconduct"


BOND_AMOUNTS = {
    "Low": 5,      # 5 test GEN
    "Medium": 10,  # 10 test GEN
    "High": 25,    # 25 test GEN
}

DEFENSE_WINDOWS = {
    "Low": 24 * 3600,     # 24 hours (seconds)
    "Medium": 48 * 3600,  # 48 hours
    "High": 72 * 3600,    # 72 hours
    "demo": 60,           # 60 seconds for demo mode
}


# ─── Main contract ────────────────────────────────────────────────────────────

class CalloutReputationCourt(Contract):
    """
    Callout Reputation Court — GenLayer Intelligent Contract

    An on-chain bonded reputation court where:
    1. Filers stake a credibility bond to file an evidence-backed case.
    2. Accused get a defense window to respond with counter-evidence.
    3. GenLayer validators review all evidence using AI consensus.
    4. The verdict becomes a permanent reputation record on-chain.
    """

    def __init__(self):
        # Storage (replace with GenLayer persistent storage primitives)
        self.cases: dict[str, dict] = {}
        self.wallet_verdicts: dict[str, list[str]] = {}  # address -> [case_id]
        self.case_counter: int = 0
        self.demo_mode: bool = True  # Set False for production

    # ─── Filing ──────────────────────────────────────────────────────────────

    @public
    def file_case(
        self,
        accused: str,
        category: str,
        severity: str,
        accusation: str,
        evidence_links: list[str],
        transaction_hashes: list[str],
        public_context_url: Optional[str] = None,
    ) -> str:
        """
        File a new case against a wallet address.

        Caller must have staked the required filing bond in test GEN
        before calling this function. Bond validation is handled by
        the GenLayer token transfer layer.

        Returns the new case ID.
        """
        assert severity in BOND_AMOUNTS, f"Invalid severity: {severity}"
        assert category in [
            CaseCategory.RUG_PULL, CaseCategory.FAKE_CLAIMS,
            CaseCategory.STOLEN_FUNDS, CaseCategory.UNDELIVERED_WORK,
            CaseCategory.IMPERSONATION, CaseCategory.SUSPICIOUS_ACTIVITY,
            CaseCategory.GOVERNANCE_ABUSE, CaseCategory.OTHER,
        ], f"Invalid category: {category}"
        assert len(accusation) >= 50, "Accusation must be at least 50 characters."
        assert len(evidence_links) > 0, "At least one evidence link is required."
        assert accused != self._caller(), "Cannot file a case against yourself."

        self.case_counter += 1
        year = datetime.utcnow().year
        case_id = f"CLT-{year}-{str(self.case_counter).zfill(3)}"

        defense_seconds = DEFENSE_WINDOWS["demo"] if self.demo_mode else DEFENSE_WINDOWS[severity]
        deadline = datetime.utcnow() + timedelta(seconds=defense_seconds)

        filing_bond = BOND_AMOUNTS[severity]

        self.cases[case_id] = {
            "id": case_id,
            "filer": self._caller(),
            "accused": accused,
            "filing_bond": filing_bond,
            "defense_bond": None,
            "accusation": accusation,
            "category": category,
            "severity": severity,
            "evidence_links": evidence_links,
            "transaction_hashes": transaction_hashes,
            "public_context_url": public_context_url,
            "defense_text": None,
            "defense_evidence": [],
            "status": CaseStatus.AWAITING_DEFENSE,
            "verdict": None,
            "confidence": None,
            "reasoning": None,
            "created_at": datetime.utcnow().isoformat(),
            "defense_deadline": deadline.isoformat(),
            "resolved_at": None,
        }

        # Track cases by accused wallet
        if accused not in self.wallet_verdicts:
            self.wallet_verdicts[accused] = []
        self.wallet_verdicts[accused].append(case_id)

        return case_id

    # ─── Defense ─────────────────────────────────────────────────────────────

    @public
    def submit_defense(
        self,
        case_id: str,
        defense_text: str,
        defense_evidence: list[str],
    ) -> bool:
        """
        Submit a defense response to an open case.

        Must be called by the accused wallet.
        Must be called before the defense deadline.
        Caller must have staked the defense bond.
        """
        case = self._get_case_or_fail(case_id)

        assert case["status"] == CaseStatus.AWAITING_DEFENSE, \
            "Case is not awaiting defense."
        assert self._caller() == case["accused"], \
            "Only the accused wallet can submit a defense."
        assert datetime.utcnow() < datetime.fromisoformat(case["defense_deadline"]), \
            "Defense window has expired."
        assert len(defense_text) >= 20, \
            "Defense must be at least 20 characters."

        defense_bond = BOND_AMOUNTS[case["severity"]]

        case["defense_text"] = defense_text
        case["defense_evidence"] = defense_evidence
        case["defense_bond"] = defense_bond
        case["status"] = CaseStatus.DEFENSE_SUBMITTED

        return True

    # ─── Review (AI Validator Call) ───────────────────────────────────────────

    @public
    def review_case(self, case_id: str) -> dict:
        """
        Trigger GenLayer validator review for a case.

        Can be called after:
        - Defense is submitted (contested review), OR
        - Defense window has expired (uncontested review).

        GenLayer validators independently run the AI prompt and
        reach consensus on the verdict.
        """
        case = self._get_case_or_fail(case_id)

        assert case["status"] in [
            CaseStatus.DEFENSE_SUBMITTED,
            CaseStatus.AWAITING_DEFENSE,
        ], "Case is not ready for review."

        deadline_passed = datetime.utcnow() > datetime.fromisoformat(case["defense_deadline"])
        is_uncontested = case["status"] == CaseStatus.AWAITING_DEFENSE and deadline_passed

        if is_uncontested:
            case["status"] = CaseStatus.UNCONTESTED_REVIEW
        else:
            case["status"] = CaseStatus.UNDER_REVIEW

        # ── Construct the AI validator prompt ────────────────────────────────
        prompt = self._build_review_prompt(case, is_uncontested)

        # ── Call GenLayer validator consensus ────────────────────────────────
        # In production, this triggers all validators to independently run
        # the prompt and submit their conclusions. Consensus determines
        # the output stored on-chain.
        raw_verdict = call_llm(prompt, temperature=0.0)

        # Parse structured verdict from AI response
        verdict_data = self._parse_verdict(raw_verdict)

        # Store verdict
        case["verdict"] = verdict_data["verdict"]
        case["confidence"] = verdict_data["confidence"]
        case["reasoning"] = verdict_data["reasoning"]
        case["status"] = CaseStatus.VERDICT_ISSUED
        case["resolved_at"] = datetime.utcnow().isoformat()

        return verdict_data

    def _build_review_prompt(self, case: dict, is_uncontested: bool) -> str:
        """
        Build the structured GenLayer validator prompt.
        This prompt is run independently by each validator.
        Consensus across validators determines the on-chain result.
        """
        defense_section = ""
        if case["defense_text"]:
            defense_section = f"""
DEFENSE SUBMITTED BY ACCUSED:
{case["defense_text"]}

Defense Evidence Links:
{chr(10).join(case["defense_evidence"]) if case["defense_evidence"] else "None provided."}
"""
        else:
            defense_section = """
DEFENSE: None submitted. This is an UNCONTESTED case.
NOTE: Absence of defense does NOT automatically constitute guilt.
Evaluate only the quality and reliability of the filer's evidence.
"""

        prompt = f"""
You are an impartial on-chain reputation court validator for the Callout protocol, powered by GenLayer.

Your task is to evaluate whether the accusation against the accused wallet is supported by the evidence provided.

You must be rigorous, fair, and evidence-first. You are NOT swayed by rhetoric. You evaluate facts.

═══════════════════════════════════════════════════════════════
CASE DETAILS
═══════════════════════════════════════════════════════════════
Case ID: {case["id"]}
Category: {case["category"]}
Severity: {case["severity"]}
Uncontested Case: {"YES — no defense was submitted" if is_uncontested else "NO — defense was submitted"}

ACCUSED WALLET: {case["accused"]}
FILER WALLET:   {case["filer"]}

═══════════════════════════════════════════════════════════════
ACCUSATION
═══════════════════════════════════════════════════════════════
{case["accusation"]}

═══════════════════════════════════════════════════════════════
EVIDENCE PROVIDED BY FILER
═══════════════════════════════════════════════════════════════
Evidence Links:
{chr(10).join(case["evidence_links"]) if case["evidence_links"] else "None provided."}

Transaction Hashes:
{chr(10).join(case["transaction_hashes"]) if case["transaction_hashes"] else "None provided."}

Public Context:
{case.get("public_context_url") or "None provided."}

{defense_section}

═══════════════════════════════════════════════════════════════
EVALUATION CRITERIA — answer each question internally:
═══════════════════════════════════════════════════════════════

1. EVIDENCE QUALITY: Does the submitted evidence directly support the accusation?
   - Is the evidence specific and verifiable?
   - Do the transaction hashes match the narrative?
   - Are the evidence links credible and relevant?

2. ACCUSATION CONSISTENCY: Is the written accusation internally consistent?
   - Does it match the evidence provided?
   - Are there contradictions or implausibilities?

3. DEFENSE ASSESSMENT (if submitted): Does the defense credibly rebut the accusation?
   - Does it provide verifiable counter-evidence?
   - Does it explain the on-chain behavior cited?

4. PUBLIC CONTEXT: Does available public information support or contradict either side?

5. MALICIOUS FILING SCREEN: Is there any indication the filing is malicious, false, or unsupported?
   - Vague accusations with no evidence = flag as Malicious Filing or Needs More Evidence
   - Personal grievance with no on-chain basis = flag accordingly

6. UNCONTESTED STANDARD: If no defense was submitted, does the evidence alone meet the threshold?
   - High-quality evidence + no defense → Claim Valid — Uncontested
   - Weak evidence + no defense → Needs More Evidence or Inconclusive

═══════════════════════════════════════════════════════════════
VERDICT OPTIONS:
═══════════════════════════════════════════════════════════════
- "Claim Valid"                : Evidence clearly supports accusation, defense is insufficient or absent.
- "Claim Invalid"              : Defense clearly rebuts accusation, or accusation is factually wrong.
- "Inconclusive"               : Evidence on both sides is roughly equal or insufficient to determine.
- "Needs More Evidence"        : Accusation may have merit but evidence is not strong enough to decide.
- "Malicious Filing"           : Filing appears false, retaliatory, or intentionally misleading.
- "Claim Valid — Uncontested"  : Strong evidence, no defense submitted.

═══════════════════════════════════════════════════════════════
OUTPUT FORMAT — respond ONLY with valid JSON, no other text:
═══════════════════════════════════════════════════════════════
{{
  "verdict": "<one of the six verdict options above>",
  "confidence": <integer 0-100>,
  "reasoning": "<2-4 sentences explaining the verdict, referencing specific evidence>",
  "evidence_quality_score": <integer 0-100>,
  "defense_quality_score": <integer 0-100 or null if no defense>,
  "malicious_filing_flag": <true or false>
}}
"""
        return prompt.strip()

    def _parse_verdict(self, raw: str) -> dict:
        """Parse the AI validator response into structured verdict data."""
        try:
            # Strip any markdown fences if present
            clean = raw.strip()
            if clean.startswith("```"):
                clean = clean.split("```")[1]
                if clean.startswith("json"):
                    clean = clean[4:]
            data = json.loads(clean.strip())
            return {
                "verdict": data.get("verdict", VerdictType.INCONCLUSIVE),
                "confidence": min(100, max(0, int(data.get("confidence", 50)))),
                "reasoning": data.get("reasoning", "No reasoning provided."),
                "evidence_quality_score": data.get("evidence_quality_score"),
                "defense_quality_score": data.get("defense_quality_score"),
                "malicious_filing_flag": data.get("malicious_filing_flag", False),
            }
        except (json.JSONDecodeError, ValueError, KeyError):
            return {
                "verdict": VerdictType.INCONCLUSIVE,
                "confidence": 0,
                "reasoning": "Validator response could not be parsed. Manual review required.",
                "evidence_quality_score": None,
                "defense_quality_score": None,
                "malicious_filing_flag": False,
            }

    # ─── Settlement ───────────────────────────────────────────────────────────

    @public
    def settle_case(self, case_id: str) -> dict:
        """
        Execute bond settlement based on the issued verdict.

        Called after review_case. Redistributes bonds according
        to verdict rules:
        - Claim Valid: Filer recovers bond + part of defense bond.
        - Claim Invalid: Accused recovers bond + part of filing bond.
        - Inconclusive: Both recover most bonds, small validator fee.
        - Malicious Filing: Filer loses bond.
        - Claim Valid — Uncontested: Filer recovers bond (no accused bond to award).
        - Needs More Evidence: Most bonds returned, case stays open for appeal.

        In production, actual test GEN token transfers happen here.
        """
        case = self._get_case_or_fail(case_id)
        assert case["status"] == CaseStatus.VERDICT_ISSUED, \
            "Case must have a verdict before settlement."

        verdict = case["verdict"]
        filing_bond = case["filing_bond"]
        defense_bond = case.get("defense_bond") or 0
        validator_fee_rate = 0.05  # 5% of total bonds go to validators

        settlement = {
            "filer": case["filer"],
            "accused": case["accused"],
            "verdict": verdict,
            "filer_receives": 0,
            "accused_receives": 0,
            "validator_fee": 0,
            "reputation_mark": None,
        }

        total_pool = filing_bond + defense_bond
        validator_fee = round(total_pool * validator_fee_rate, 2)

        if verdict == VerdictType.CLAIM_VALID:
            # Filer wins
            filer_award = filing_bond + round(defense_bond * 0.8, 2) - validator_fee
            settlement["filer_receives"] = max(0, filer_award)
            settlement["accused_receives"] = round(defense_bond * 0.2, 2)
            settlement["reputation_mark"] = "Flagged"

        elif verdict == VerdictType.CLAIM_INVALID:
            # Accused wins
            accused_award = defense_bond + round(filing_bond * 0.8, 2) - validator_fee
            settlement["accused_receives"] = max(0, accused_award)
            settlement["filer_receives"] = round(filing_bond * 0.2, 2)
            settlement["reputation_mark"] = "Cleared"

        elif verdict == VerdictType.INCONCLUSIVE:
            # Both mostly returned
            settlement["filer_receives"] = round(filing_bond * 0.9, 2)
            settlement["accused_receives"] = round(defense_bond * 0.9, 2)
            settlement["reputation_mark"] = None

        elif verdict == VerdictType.MALICIOUS_FILING:
            # Filer loses bond
            settlement["filer_receives"] = 0
            settlement["accused_receives"] = round(filing_bond * 0.9, 2)
            settlement["reputation_mark"] = None  # No mark on accused

        elif verdict == VerdictType.NEEDS_MORE_EVIDENCE:
            # Mostly returned, case may be re-filed with more evidence
            settlement["filer_receives"] = round(filing_bond * 0.85, 2)
            settlement["accused_receives"] = round(defense_bond * 0.85, 2) if defense_bond else 0
            settlement["reputation_mark"] = None

        elif verdict == VerdictType.CLAIM_VALID_UNCONTESTED:
            # Filer recovers bond, no accused bond to award
            settlement["filer_receives"] = round(filing_bond * 0.95, 2)
            settlement["accused_receives"] = 0
            settlement["reputation_mark"] = "Flagged"

        settlement["validator_fee"] = validator_fee
        case["status"] = CaseStatus.ON_RECORD if settlement["reputation_mark"] == "Flagged" else CaseStatus.CLEARED

        # In production: execute actual token transfers to filer and accused wallets.
        # self._transfer(case["filer"], settlement["filer_receives"])
        # self._transfer(case["accused"], settlement["accused_receives"])
        # self._transfer(VALIDATOR_POOL_ADDRESS, settlement["validator_fee"])

        return settlement

    # ─── View functions ───────────────────────────────────────────────────────

    @view
    def get_case(self, case_id: str) -> Optional[dict]:
        """Return full case data by case ID."""
        return self.cases.get(case_id)

    @view
    def get_wallet_verdicts(self, wallet_address: str) -> list[dict]:
        """Return all cases and verdicts associated with a wallet address."""
        case_ids = self.wallet_verdicts.get(wallet_address, [])
        return [
            {
                "case_id": cid,
                "verdict": self.cases[cid].get("verdict"),
                "status": self.cases[cid].get("status"),
                "resolved_at": self.cases[cid].get("resolved_at"),
            }
            for cid in case_ids
            if cid in self.cases
        ]

    @view
    def get_wallet_reputation(self, wallet_address: str) -> dict:
        """Return the reputation summary for a wallet address."""
        case_ids = self.wallet_verdicts.get(wallet_address, [])
        cases = [self.cases[cid] for cid in case_ids if cid in self.cases]

        flagged = sum(1 for c in cases if c.get("verdict") in [
            VerdictType.CLAIM_VALID, VerdictType.CLAIM_VALID_UNCONTESTED
        ])
        cleared = sum(1 for c in cases if c.get("verdict") == VerdictType.CLAIM_INVALID)
        open_cases = sum(1 for c in cases if c.get("status") in [
            CaseStatus.AWAITING_DEFENSE, CaseStatus.DEFENSE_SUBMITTED,
            CaseStatus.UNDER_REVIEW, CaseStatus.UNCONTESTED_REVIEW,
        ])

        if flagged > 0:
            status = "Flagged"
        elif open_cases > 0:
            status = "Challenged"
        elif cleared > 0 and flagged == 0:
            status = "Cleared"
        else:
            status = "Clean"

        return {
            "wallet": wallet_address,
            "status": status,
            "open_cases": open_cases,
            "resolved_cases": len([c for c in cases if c.get("verdict")]),
            "flagged_count": flagged,
            "cleared_count": cleared,
        }

    @view
    def list_cases(self, status_filter: Optional[str] = None) -> list[dict]:
        """List all cases, optionally filtered by status."""
        result = list(self.cases.values())
        if status_filter:
            result = [c for c in result if c["status"] == status_filter]
        return sorted(result, key=lambda c: c["created_at"], reverse=True)

    # ─── Internal helpers ─────────────────────────────────────────────────────

    def _caller(self) -> str:
        """Return the calling wallet address (GenLayer msg.sender equivalent)."""
        raise NotImplementedError("Replace with GenLayer caller context.")

    def _get_case_or_fail(self, case_id: str) -> dict:
        """Fetch a case by ID or raise an error."""
        case = self.cases.get(case_id)
        assert case is not None, f"Case {case_id} not found."
        return case


# ─── Deployment note ─────────────────────────────────────────────────────────
#
# To deploy this contract on GenLayer:
# 1. Install the GenLayer CLI: pip install genlayer
# 2. Configure your network: genlayer config set network testnet
# 3. Deploy: genlayer deploy contracts/callout_reputation_court.py
# 4. Copy the deployed contract address to NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local
# 5. Replace all mock frontend calls (src/app/file-case, src/app/case/[id])
#    with real GenLayer SDK calls using the contract address.
#
# Refer to https://docs.genlayer.io for current SDK usage and GenLayer Studio.
