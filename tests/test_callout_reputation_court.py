"""
Local flow test for contracts/callout_reputation_court.py.

Run from the project root:
    python tests/test_callout_reputation_court.py

This is a local simulation harness. The Python GenLayer SDK is not installed in
this repo by default, so the script supplies only the minimal transaction and
storage shell needed to import and call the contract class. The AI/equivalence
review is mocked with a deterministic verdict; the contract file itself still
uses the real GenLayer imports and primitives for Studio/Shippyard.
"""

from pathlib import Path
import importlib.util
import json
import sys
import types


VALID_VERDICTS = {"valid", "invalid", "inconclusive"}
ROOT = Path(__file__).resolve().parents[1]
CONTRACT_PATH = ROOT / "contracts" / "callout_reputation_court.py"


class Address(str):
    pass


class u256(int):
    pass


class DynArray(list):
    pass


class TreeMap(dict):
    pass


class PublicDecorator:
    @property
    def write(self):
        return self

    @property
    def view(self):
        return self

    @property
    def payable(self):
        return self

    def __call__(self, fn):
        return fn


class Message:
    sender_address = Address("")
    value = u256(0)


class Storage:
    @staticmethod
    def inmem_allocate(container_type):
        return container_type()

    @staticmethod
    def copy_to_memory(value):
        if isinstance(value, list):
            return list(value)
        if isinstance(value, dict):
            return dict(value)
        return value


class VM:
    class UserError(Exception):
        pass


def install_local_genlayer_harness():
    genlayer = types.ModuleType("genlayer")

    gl = types.SimpleNamespace()
    gl.Contract = object
    gl.public = PublicDecorator()
    gl.message = Message()
    gl.storage = Storage()
    gl.vm = VM()

    # Mocked review edge: local Python cannot call GenLayer validators. The
    # contract still invokes gl.eq_principle.prompt_comparative exactly as it
    # would in Studio/Shippyard; this harness returns the local LLM result.
    gl.nondet = types.SimpleNamespace(
        exec_prompt=lambda prompt, response_format=None: {
            "verdict": "valid",
            "reasoning": "Local test verdict: evidence URL was supplied.",
        }
    )
    gl.eq_principle = types.SimpleNamespace(
        prompt_comparative=lambda fn, principle=None: fn()
    )

    genlayer.gl = gl
    genlayer.Address = Address
    genlayer.u256 = u256
    genlayer.DynArray = DynArray
    genlayer.TreeMap = TreeMap

    sys.modules["genlayer"] = genlayer
    return gl


def import_contract_module():
    try:
        import genlayer  # noqa: F401
    except ModuleNotFoundError:
        gl = install_local_genlayer_harness()
    else:
        # Studio/GenVM supplies the real runtime. For this standalone script we
        # still patch only the AI equivalence call so the test remains offline.
        import genlayer

        gl = genlayer.gl
        gl.nondet.exec_prompt = lambda prompt, response_format=None: {
            "verdict": "valid",
            "reasoning": "Local test verdict: evidence URL was supplied.",
        }
        gl.eq_principle.prompt_comparative = lambda fn, principle=None: fn()

    spec = importlib.util.spec_from_file_location(
        "callout_reputation_court",
        CONTRACT_PATH,
    )
    module = importlib.util.module_from_spec(spec)
    sys.modules["callout_reputation_court"] = module
    spec.loader.exec_module(module)
    return module, gl


def allocate_contract_storage(contract):
    contract.cases = DynArray()
    contract.cases_by_accused = TreeMap()
    contract.filer = TreeMap()
    contract.accused = TreeMap()
    contract.accused_entity = TreeMap()
    contract.status = TreeMap()
    contract.verdict = TreeMap()
    contract.appeal_status = TreeMap()
    contract.accusation = TreeMap()
    contract.defense = TreeMap()
    contract.evidence_links = TreeMap()
    contract.defense_evidence_links = TreeMap()
    contract.filing_bond = TreeMap()
    contract.defense_bond = TreeMap()
    contract.created_at = TreeMap()
    contract.defense_deadline = TreeMap()
    contract.resolved_at = TreeMap()
    contract.reasoning = TreeMap()


def main():
    module, gl = import_contract_module()
    contract = module.CalloutReputationCourt()
    allocate_contract_storage(contract)

    filer = Address("0x1000000000000000000000000000000000000001")
    accused = Address("0x2000000000000000000000000000000000000002")

    gl.message.sender_address = filer
    gl.message.value = u256(0)
    case_id = contract.create_case(
        str(accused),
        "Example DAO operator",
        "The accused wallet allegedly misrepresented treasury activity.",
        "https://example.com/callout/evidence/treasury-report",
    )

    gl.message.sender_address = accused
    gl.message.value = u256(0)
    contract.add_defense(
        case_id,
        "The cited transaction was an approved treasury migration.",
        "https://example.com/callout/defense/governance-vote",
    )

    gl.message.sender_address = filer
    gl.message.value = u256(0)
    verdict = contract.review_case(case_id)
    assert verdict in VALID_VERDICTS, f"unexpected verdict: {verdict}"

    contract.finalize_verdict(case_id)
    details = {
        "case_id": case_id,
        "case_ids": contract.list_cases(),
        "cases_by_accused": contract.get_cases_by_accused(str(accused)),
        "filer": contract.filer[case_id],
        "accused": contract.accused[case_id],
        "accused_entity": contract.accused_entity[case_id],
        "status": contract.status[case_id],
        "verdict": contract.verdict[case_id],
        "appeal_status": contract.appeal_status[case_id],
        "accusation": contract.accusation[case_id],
        "defense": contract.defense[case_id],
        "evidence_links": contract.evidence_links[case_id],
        "defense_evidence_links": contract.defense_evidence_links[case_id],
        "filing_bond": contract.filing_bond[case_id],
        "defense_bond": contract.defense_bond[case_id],
        "created_at": contract.created_at[case_id],
        "defense_deadline": contract.defense_deadline[case_id],
        "resolved_at": contract.resolved_at[case_id],
        "reasoning": contract.reasoning[case_id],
    }

    print("Final verdict:", verdict)
    print(json.dumps(details, indent=2, default=str))


if __name__ == "__main__":
    main()
