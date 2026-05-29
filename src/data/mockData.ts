export type CaseStatus =
  | "Awaiting Defense"
  | "Under GenLayer Review"
  | "Defense Submitted"
  | "Verdict Issued"
  | "Uncontested Review"
  | "Cleared"
  | "On Record";

export type VerdictType =
  | "Claim Valid"
  | "Claim Invalid"
  | "Inconclusive"
  | "Needs More Evidence"
  | "Malicious Filing"
  | "Claim Valid — Uncontested";

export type Severity = "Low" | "Medium" | "High";

export type Category =
  | "Rug pull"
  | "Fake claims"
  | "Stolen funds"
  | "Undelivered work"
  | "Impersonation"
  | "Suspicious wallet activity"
  | "Governance abuse"
  | "Other misconduct";

export interface Evidence {
  type: "Transaction Hash" | "Screenshot" | "Public Post" | "Contract Address" | "Other";
  value: string;
  label: string;
}

export interface ValidatorCard {
  name: string;
  recommendation: string;
  confidence: number;
  reasoning: string;
}

export interface Case {
  id: string;
  accused: string;
  filer: string;
  category: Category;
  severity: Severity;
  accusation: string;
  evidenceLinks: string[];
  transactionHashes: string[];
  filingBond: number;
  defenseBond: number | null;
  status: CaseStatus;
  verdict: VerdictType | null;
  confidence: number | null;
  reasoning: string | null;
  createdAt: string;
  defenseDeadline: string;
  resolvedAt: string | null;
  defenseText: string | null;
  evidenceCount: number;
  validators?: ValidatorCard[];
}

export interface WalletProfile {
  address: string;
  status: "Clean" | "Challenged" | "Flagged" | "Cleared";
  openCases: number;
  resolvedCases: number;
  reputationScore: number;
  riskLabel: "Low Risk" | "Medium Risk" | "High Risk" | "Verified Clean";
  onChainRecordHash: string | null;
  joinedAt: string;
}

const FUTURE = (seconds: number) =>
  new Date(Date.now() + seconds * 1000).toISOString();

const PAST = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

export const mockCases: Case[] = [
  {
    id: "CLT-2026-001",
    accused: "0xA91F4C22B83D91F4C22B",
    filer: "0xB34E...9A1C",
    category: "Undelivered work",
    severity: "High",
    accusation:
      "This wallet collected 12 ETH from a community grant for a cross-chain bridge integration and disappeared without delivering any code, documentation, or milestone updates. Communication ceased 6 weeks after payment. Multiple community members have confirmed this.",
    evidenceLinks: [
      "https://twitter.com/example/status/123456",
      "https://forum.project.io/discussion/892",
    ],
    transactionHashes: [
      "0x7f4c3e1a9b2d8f6e5c0a4b7d3e9f1a2c4b6e8d0f2a4c6e8b0d2f4a6c8e0b2d4",
    ],
    filingBond: 25,
    defenseBond: null,
    status: "Awaiting Defense",
    verdict: null,
    confidence: null,
    reasoning: null,
    createdAt: PAST(1),
    defenseDeadline: FUTURE(60),
    resolvedAt: null,
    defenseText: null,
    evidenceCount: 3,
  },
  {
    id: "CLT-2026-002",
    accused: "0xF93C...7B2A",
    filer: "0xD12A...4E8F",
    category: "Suspicious wallet activity",
    severity: "Medium",
    accusation:
      "The accused wallet executed a series of coordinated transactions 4 hours before a major token announcement, suggesting insider trading or front-running. On-chain data shows 47K USDC moved into the target token 4.2 hours before the tweet.",
    evidenceLinks: ["https://etherscan.io/address/0xF93C", "https://dune.com/dashboard/123"],
    transactionHashes: [
      "0x3a9f2e1c8b7d4f6a5e0c3b8d1f9a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f6",
    ],
    filingBond: 10,
    defenseBond: 10,
    status: "Defense Submitted",
    verdict: null,
    confidence: null,
    reasoning: null,
    createdAt: PAST(3),
    defenseDeadline: PAST(2),
    resolvedAt: null,
    defenseText:
      "The transactions cited were part of a pre-arranged DCA strategy set 3 weeks prior. On-chain timestamps and smart contract configuration confirm this. The accusation conflates timing correlation with intent.",
    evidenceCount: 5,
    validators: [
      {
        name: "Evidence Consistency Validator",
        recommendation: "Inconclusive",
        confidence: 58,
        reasoning:
          "Evidence links support the timing claim but cannot distinguish automated DCA from manual front-running without additional contract state data.",
      },
      {
        name: "On-Chain History Validator",
        recommendation: "Leans Defendant",
        confidence: 64,
        reasoning:
          "Wallet shows a 3-month DCA pattern consistent with the defense narrative. No similar spike activity around other announcements.",
      },
      {
        name: "Public Context Validator",
        recommendation: "Inconclusive",
        confidence: 51,
        reasoning:
          "No public information links the accused to insider access. The announcement was leaked externally before the official tweet.",
      },
      {
        name: "Defense Validity Validator",
        recommendation: "Defense Supported",
        confidence: 71,
        reasoning:
          "Defense documentation is substantive and provides verifiable on-chain proof of the DCA contract configuration.",
      },
    ],
  },
  {
    id: "CLT-2026-003",
    accused: "0x7E2B...C44D",
    filer: "0xA01B...F22C",
    category: "Fake claims",
    severity: "Medium",
    accusation:
      "This wallet and associated X account falsely claimed a partnership with Arbitrum Foundation to drive token sales. The Arbitrum Foundation has publicly denied any relationship.",
    evidenceLinks: [
      "https://twitter.com/ArbitrumFND/status/denial",
      "https://twitter.com/accused/status/claim",
    ],
    transactionHashes: [],
    filingBond: 10,
    defenseBond: null,
    status: "Verdict Issued",
    verdict: "Claim Valid",
    confidence: 88,
    reasoning:
      "Evidence is clear and cross-verified. The Arbitrum Foundation denial is public and explicit. On-chain token sale activity correlates directly with the false announcement. No defense was submitted.",
    createdAt: PAST(10),
    defenseDeadline: PAST(9),
    resolvedAt: PAST(7),
    defenseText: null,
    evidenceCount: 4,
    validators: [
      {
        name: "Evidence Consistency Validator",
        recommendation: "Claim Valid",
        confidence: 91,
        reasoning:
          "Screenshots, official denial, and token sale data are all consistent and mutually corroborating.",
      },
      {
        name: "On-Chain History Validator",
        recommendation: "Claim Valid",
        confidence: 85,
        reasoning:
          "Wallet received 18.4 ETH in sales within 6 hours of the false claim being posted.",
      },
      {
        name: "Public Context Validator",
        recommendation: "Claim Valid",
        confidence: 93,
        reasoning:
          "Arbitrum Foundation denial is a direct, official public statement. No ambiguity.",
      },
      {
        name: "Defense Validity Validator",
        recommendation: "No Defense",
        confidence: 100,
        reasoning: "Defense window expired. No response submitted.",
      },
    ],
  },
  {
    id: "CLT-2026-004",
    accused: "0x3D9A...B11E",
    filer: "0xC88F...2D4A",
    category: "Governance abuse",
    severity: "High",
    accusation:
      "This wallet coordinated a flash loan attack on a DAO governance vote, temporarily acquiring 34% of voting power to pass a malicious treasury drain proposal before repaying the loan.",
    evidenceLinks: [
      "https://etherscan.io/tx/governance-attack",
      "https://gov.protocol.io/proposal/44",
    ],
    transactionHashes: [
      "0x1c4f9e2a8b5d7c3e0f6a4b8d2e1c9f3a5b7d9e1c3f5a7b9d1e3f5a7b9d1e3f5",
    ],
    filingBond: 25,
    defenseBond: 25,
    status: "Under GenLayer Review",
    verdict: null,
    confidence: null,
    reasoning: null,
    createdAt: PAST(5),
    defenseDeadline: PAST(4),
    resolvedAt: null,
    defenseText:
      "The flash loan was used to test governance security, not exploit it. The proposal was created by a separate wallet and I had no connection to it. I never voted on the proposal.",
    evidenceCount: 6,
    validators: [
      {
        name: "Evidence Consistency Validator",
        recommendation: "Reviewing",
        confidence: 0,
        reasoning: "Analysis in progress.",
      },
      {
        name: "On-Chain History Validator",
        recommendation: "Reviewing",
        confidence: 0,
        reasoning: "Analysis in progress.",
      },
      {
        name: "Public Context Validator",
        recommendation: "Reviewing",
        confidence: 0,
        reasoning: "Analysis in progress.",
      },
      {
        name: "Defense Validity Validator",
        recommendation: "Reviewing",
        confidence: 0,
        reasoning: "Analysis in progress.",
      },
    ],
  },
  {
    id: "CLT-2026-005",
    accused: "0x9F1C...A33B",
    filer: "0xE55D...7F1A",
    category: "Impersonation",
    severity: "Low",
    accusation:
      "Wallet associated with an X account impersonating the Uniswap Labs team, using near-identical username and profile to solicit test tokens from developers.",
    evidenceLinks: ["https://twitter.com/fake_uniswap"],
    transactionHashes: [],
    filingBond: 5,
    defenseBond: null,
    status: "Uncontested Review",
    verdict: null,
    confidence: null,
    reasoning: null,
    createdAt: PAST(2),
    defenseDeadline: PAST(1),
    resolvedAt: null,
    defenseText: null,
    evidenceCount: 2,
  },
  {
    id: "CLT-2026-006",
    accused: "0xB77E...D22F",
    filer: "0xF00A...C19B",
    category: "Rug pull",
    severity: "High",
    accusation:
      "Project launched with 4,200 ETH raised across 3 rounds. Liquidity was removed 48 hours after last public sale. Team wallets drained to exchanges within 6 hours.",
    evidenceLinks: [
      "https://etherscan.io/address/project-lp",
      "https://rugdoc.io/case/project",
    ],
    transactionHashes: [
      "0x9e2c4a6f1b8d3e7a2c5f0b4d9e1a6c3f8b2d5e9a1c4f7b0d3e6a9c2f5b8d1e4",
    ],
    filingBond: 25,
    defenseBond: null,
    status: "On Record",
    verdict: "Claim Valid — Uncontested",
    confidence: 94,
    reasoning:
      "On-chain evidence is overwhelming. LP removal, team wallet drains, and exchange deposits all occurred within the described timeframe. No defense submitted. Verdict: Claim Valid — Uncontested.",
    createdAt: PAST(14),
    defenseDeadline: PAST(13),
    resolvedAt: PAST(11),
    defenseText: null,
    evidenceCount: 7,
  },
];

export const mockWallets: Record<string, WalletProfile> = {
  "0xA91F4C22B83D91F4C22B": {
    address: "0xA91F4C22B83D91F4C22B",
    status: "Challenged",
    openCases: 1,
    resolvedCases: 0,
    reputationScore: 42,
    riskLabel: "Medium Risk",
    onChainRecordHash: null,
    joinedAt: PAST(30),
  },
  "0x7E2B...C44D": {
    address: "0x7E2B...C44D",
    status: "Flagged",
    openCases: 0,
    resolvedCases: 1,
    reputationScore: 12,
    riskLabel: "High Risk",
    onChainRecordHash:
      "0xdeadbeef1234567890abcdef1234567890abcdef1234567890abcdef12345678",
    joinedAt: PAST(90),
  },
  "0xB77E...D22F": {
    address: "0xB77E...D22F",
    status: "Flagged",
    openCases: 0,
    resolvedCases: 1,
    reputationScore: 5,
    riskLabel: "High Risk",
    onChainRecordHash:
      "0xcafe0000aaaa1234567890abcdef1234567890abcdef1234567890abcdef1234",
    joinedAt: PAST(180),
  },
  "0xF93C...7B2A": {
    address: "0xF93C...7B2A",
    status: "Challenged",
    openCases: 1,
    resolvedCases: 0,
    reputationScore: 61,
    riskLabel: "Medium Risk",
    onChainRecordHash: null,
    joinedAt: PAST(60),
  },
};

export const demoWallet: WalletProfile = {
  address: "0xA91F...C22B",
  status: "Clean",
  openCases: 0,
  resolvedCases: 2,
  reputationScore: 88,
  riskLabel: "Low Risk",
  onChainRecordHash: null,
  joinedAt: PAST(120),
};

export const metrics = {
  casesFiled: 1284,
  casesResolved: 847,
  walletsOnRecord: 312,
  evidenceCompletionRate: 91,
  defenseResponses: 426,
  validClaims: 64,
  inconclusive: 18,
  clearedWallets: 203,
};
