# Callout — On-Chain Reputation Court

Callout is an evidence-based accountability protocol for crypto wallets and public Web3 entities. A filer creates a case, the accused can add a defense, and GenLayer AI validators review the evidence through an Intelligent Contract before the verdict is finalized on-chain.

The corrected contract lives at:

```text
contracts/callout_reputation_court.py
```

## Why GenLayer

Callout needs smart-contract state plus judgment over natural-language evidence, URLs, and defense narratives. Traditional deterministic contracts are good at storing records, but not at evaluating claims. GenLayer Intelligent Contracts let Callout keep the case registry on-chain while using AI validators for the review step.

The contract uses GenLayer for:

- Persistent on-chain state with class-level typed storage.
- Public write and read methods exposed in Shippyard.
- Non-deterministic AI review with GenLayer equivalence-principle validation.
- Final verdict storage as one of `valid`, `invalid`, or `inconclusive`.

## Deployed Contracts

| Network | Purpose | Address |
|---|---|---|
| Studionet | Tested full flow | `0x846a5dcB0b4B381AdD32F970C6259551aCfc5F34` |
| Bradbury | Final corrected contract | `0xcD216A59c0154C49DB3451b1252377960398CBE0` |

The frontend config points to the Bradbury final contract.

## Intelligent Contract

The contract is Python-based and follows the GenLayer Intelligent Contract structure:

- First-line GenVM dependency comment.
- `from genlayer import *`
- `class CalloutReputationCourt(gl.Contract)`
- Persistent state declared in the contract class body with typed storage.
- Public write methods decorated with `@gl.public.write`.
- Public read methods decorated with `@gl.public.view`.
- AI review through `gl.nondet.exec_prompt`.
- Equivalence checking through `gl.eq_principle.prompt_comparative`.

The original rejected version was fixed by removing Solidity-style/mock contract logic, removing fake SDK placeholders, simplifying Shippyard-facing method signatures, and using the correct GenLayer public method decorators and contract structure.

## Contract Flow

1. `create_case`
   - Inputs: `accused_address`, `accused_entity`, `accusation`, `evidence_links`
   - Stores the filer from `gl.message.sender_address`
   - Creates a new `case_id`
   - Sets status to `open`

2. `add_defense`
   - Inputs: `case_id`, `defense`, `defense_evidence_links`
   - Stores the accused response
   - Sets status to `defended`

3. `review_case`
   - Input: `case_id`
   - Runs GenLayer AI/equivalence review
   - Stores verdict as `valid`, `invalid`, or `inconclusive`
   - Sets status to `reviewed`

4. `finalize_verdict`
   - Input: `case_id`
   - Finalizes a reviewed verdict
   - Sets status to `finalized`

5. `mark_appealed`
   - Inputs: `case_id`, `appeal_status`
   - Updates appeal status after finalization

6. `list_cases`
   - Returns all case IDs

7. `get_cases_by_accused`
   - Input: `accused_address`
   - Returns the case IDs linked to that accused address

## Shippyard Testing

Open the deployed contract in Shippyard and select the target network.

Studionet tested contract:

```text
0x846a5dcB0b4B381AdD32F970C6259551aCfc5F34
```

Bradbury final contract:

```text
0xcD216A59c0154C49DB3451b1252377960398CBE0
```

Suggested flow:

1. Call `create_case` with:
   - `accused_address`: any wallet/entity address string
   - `accused_entity`: a readable name
   - `accusation`: short claim text
   - `evidence_links`: URL or comma-separated URLs

2. Call `add_defense` with:
   - `case_id`: returned case ID, usually `1` for the first case
   - `defense`: defense text
   - `defense_evidence_links`: URL or comma-separated URLs

3. Call `review_case` with the same `case_id`.

4. Call `finalize_verdict` with the same `case_id`.

5. Confirm read methods:
   - `list_cases`
   - `get_cases_by_accused`

## Reviewer Notes

- The contract now exposes Read (2) and Write (5) methods in Shippyard.
- Write methods: `create_case`, `add_defense`, `review_case`, `finalize_verdict`, `mark_appealed`.
- Read methods: `list_cases`, `get_cases_by_accused`.
- The full flow was tested successfully on Studionet.
- The final corrected contract was deployed on Bradbury.

## Local Verification

Run these from the `callout` project root:

```powershell
python -m py_compile contracts\callout_reputation_court.py
python tests\test_callout_reputation_court.py
```

The local test imports the contract, installs a tiny local harness only when the Python GenLayer module is not available, mocks only the AI/equivalence review edge, and simulates:

- `create_case`
- `add_defense`
- `review_case`
- `finalize_verdict`
- `list_cases`
- `get_cases_by_accused`

## Frontend

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Environment variables:

```env
NEXT_PUBLIC_GENLAYER_FAUCET_URL=https://testnet-faucet.genlayer.foundation
NEXT_PUBLIC_GENLAYER_NETWORK=bradbury
NEXT_PUBLIC_CONTRACT_ADDRESS=0xcD216A59c0154C49DB3451b1252377960398CBE0
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

## Project Structure

```text
callout/
├── contracts/
│   └── callout_reputation_court.py
├── tests/
│   └── test_callout_reputation_court.py
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   └── lib/
│       ├── genlayerContract.ts
│       └── utils.ts
└── README.md
```

## Important Notes

- Bonds are currently stored as placeholder strings in the corrected contract so the Shippyard interface parser exposes the full public flow reliably.
- The frontend still contains demo/mock docket data while the contract flow is verified separately in Shippyard.
- Test GEN has no real-world value.
- Verdicts are constrained to `valid`, `invalid`, or `inconclusive`.
- Silence or absence of a defense is not automatic guilt; the AI review still evaluates the submitted evidence.

## License

MIT
