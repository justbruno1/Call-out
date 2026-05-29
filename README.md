# Callout — The Crypto Accountability Protocol

> **Put it on record.**

Callout is a bonded reputation court on GenLayer where evidence-backed accusations are judged by decentralized AI validators and dishonest parties pay the cost.

---

## What is Callout?

Callout lets anyone file an on-chain case against a crypto wallet or named entity. The filer posts a **credibility bond** in test GEN tokens. The accused gets a **defense window** to respond with counter-evidence and their own bond. GenLayer Intelligent Contracts then review both sides through **AI validator consensus** and issue a permanent on-chain verdict.

**Core flow:**

```
File Case → Stake Bond → Defense Countdown → Respond or Expire
→ GenLayer Review → Verdict → On-Chain Reputation Mark
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
# GenLayer faucet URL — users need test GEN to file and defend cases
NEXT_PUBLIC_GENLAYER_FAUCET_URL=https://faucet.genlayer.io

# GenLayer network (testnet, devnet, etc.)
NEXT_PUBLIC_GENLAYER_NETWORK=testnet

# Deployed Callout contract address (after deploying contracts/callout_reputation_court.py)
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## App Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with all sections |
| `/docket` | Public docket — browse and filter all cases |
| `/file-case` | File a new case with evidence and bond |
| `/case/[id]` | Case detail — countdown, evidence, validators, verdict |
| `/wallet/[address]` | Wallet reputation profile and case history |
| `/faucet` | Info page for getting test GEN tokens |

---

## Demo Mode

Callout runs in **demo mode** by default:

- Defense window is **60 seconds** (production: 24–72 hours based on severity)
- All cases use **test GEN tokens** (no real value)
- Mock data is loaded from `src/data/mockData.ts`
- Wallet connection is a **simulated mock** — replace with wagmi/viem for production

A demo mode banner is shown on relevant pages.

---

## Project Structure

```
callout/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home / landing page
│   │   ├── docket/             # Public docket
│   │   ├── file-case/          # File a case flow
│   │   ├── case/[id]/          # Case detail
│   │   ├── wallet/[address]/   # Wallet reputation profile
│   │   └── faucet/             # Faucet info page
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── ui/                 # Button, StatusBadge, CountdownTimer, Logo, AnimatedSection
│   │   ├── background/         # PageShell, CaseGridBackground, StampWatermark
│   │   ├── cards/              # CaseCard, MetricCard, ValidatorCard, VerdictStamp, WalletCard
│   │   └── sections/           # All landing page sections
│   ├── data/
│   │   └── mockData.ts         # Demo cases, wallets, metrics
│   ├── hooks/
│   │   └── useWallet.ts        # Simulated wallet hook (replace with wagmi)
│   └── lib/
│       └── utils.ts            # Helper utilities
├── contracts/
│   └── callout_reputation_court.py  # GenLayer Intelligent Contract concept
├── .env.example
└── README.md
```

---

## GenLayer Contract

The `contracts/callout_reputation_court.py` file is a complete **GenLayer Intelligent Contract concept** for the Callout court system.

Key functions:
- `file_case()` — Opens a new case with a credibility bond
- `submit_defense()` — Accused submits counter-evidence and defense bond
- `review_case()` — Triggers GenLayer AI validator consensus review
- `settle_case()` — Distributes bonds based on the verdict
- `get_wallet_reputation()` — Returns a wallet's on-chain reputation status

To deploy on GenLayer:
1. Install GenLayer CLI
2. Deploy: `genlayer deploy contracts/callout_reputation_court.py`
3. Add the contract address to `NEXT_PUBLIC_CONTRACT_ADDRESS`
4. Replace mock frontend calls with real GenLayer SDK calls

Refer to [https://docs.genlayer.io](https://docs.genlayer.io) for current SDK docs.

---

## Bond System

| Severity | Filing Bond | Defense Bond |
|----------|------------|--------------|
| Low      | 5 tGEN     | 5 tGEN       |
| Medium   | 10 tGEN    | 10 tGEN      |
| High     | 25 tGEN    | 25 tGEN      |

Bond rules:
- **Filer wins** → Bond returned + part of accused's defense bond
- **Accused wins** → Bond returned + part of filer's filing bond  
- **Inconclusive** → Most bonds returned, small validator fee
- **Malicious filing** → Filer loses bond
- **No defense submitted** → Uncontested review (silence ≠ guilt)

---

## Verdict Types

| Verdict | Meaning |
|---------|---------|
| Claim Valid | Evidence clearly supports accusation |
| Claim Invalid | Defense rebuts accusation |
| Inconclusive | Insufficient evidence either way |
| Needs More Evidence | Accusation may have merit, more proof required |
| Malicious Filing | Filing appears false or retaliatory |
| Claim Valid — Uncontested | Strong evidence, no defense submitted |

---

## Tech Stack

- **Next.js 14** — App Router
- **TypeScript** — Full type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations and scroll reveals
- **lucide-react** — Icons
- **GenLayer** — Intelligent Contract layer (powered by AI validator consensus)

---

## Replacing Mock Wallet Connection

The current wallet hook (`src/hooks/useWallet.ts`) is a simulated mock.

To replace with a real wallet connection:

```bash
npm install wagmi viem @wagmi/core
```

Then update `src/hooks/useWallet.ts` to use `useAccount`, `useConnect`, and `useDisconnect` from wagmi.

---

## Customisation

| What | Where |
|------|-------|
| Faucet URL | `.env.local` → `NEXT_PUBLIC_GENLAYER_FAUCET_URL` |
| Contract address | `.env.local` → `NEXT_PUBLIC_CONTRACT_ADDRESS` |
| Brand colors | `tailwind.config.ts` |
| Mock data | `src/data/mockData.ts` |
| Defense window (demo) | `contracts/callout_reputation_court.py` → `DEFENSE_WINDOWS["demo"]` |

---

## Important Notes

- Test GEN has **no real-world value** — this is a testnet demo
- The product framing is **not gambling** — it is a credibility bond court
- Use "bond", never "bet" in any UI copy
- Silence (no defense) triggers Uncontested Review — **not automatic guilt**
- All verdicts are permanent on-chain records

---

## License

MIT — Built for the GenLayer Hackathon 2026.

---

*Callout — Put it on record.*
