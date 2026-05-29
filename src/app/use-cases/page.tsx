import React from "react";
import Link from "next/link";
import { ArrowRight, Banknote, FileX, UserX, ShieldOff, Fingerprint, Vote, GitFork, AlertOctagon } from "lucide-react";

export const metadata = { title: "Use Cases — Callout" };

const useCases = [
  { icon:Banknote,    category:"Rug Pull",                severity:"High",    title:"Projects that raise funds and disappear",                  body:"A token project raises ETH across multiple rounds then removes all liquidity within hours of the final sale. Team wallets drain to exchanges. Callout lets affected parties file with on-chain transaction proof. Strong evidence and no defense results in a permanent Claim Valid — Uncontested mark.",  example:"Evidence: LP removal TX hash, team wallet drain to exchange, promotion screenshots" },
  { icon:FileX,       category:"Fake Claims",              severity:"Medium",  title:"False partnership or endorsement announcements",           body:"A wallet falsely claims a partnership with a major protocol to drive token sales. The named protocol publicly denies it. The denial is a verifiable public document, the on-chain token sale activity is timestamped, and the false claim is archived. Validators cross-reference all three.",              example:"Evidence: Official denial post, token sale on-chain data, original false claim screenshot" },
  { icon:UserX,       category:"Undelivered Work",         severity:"High",    title:"Contractors and grantees who ghost after payment",        body:"A developer receives a DAO grant for a specific deliverable and disappears without delivering. The payment transaction is verifiable. The absence of the promised deliverable is documentable. Callout gives the payer a formal, public record of the failure that lives on-chain permanently.",               example:"Evidence: Payment TX hash, original agreement post, absence of any delivered work" },
  { icon:Fingerprint, category:"Impersonation",            severity:"Low",     title:"Fake accounts impersonating known protocols or teams",    body:"Wallets tied to accounts impersonating Uniswap Labs, Aave, or known founders to solicit tokens or credentials. The impersonating account is identifiable, the wallet is on-chain, and the harm is documentable. A Callout case creates a searchable public record linking that wallet to the impersonation.",    example:"Evidence: Screenshot of impersonating account, link to verified official account" },
  { icon:ShieldOff,   category:"Stolen Funds",             severity:"High",    title:"Direct theft from wallets, multisigs, or treasuries",     body:"A signer drains a shared treasury to a personal wallet. The transaction trail is fully on-chain and timestamped. Callout cases in this category are evidence-rich because the blockchain is its own evidence. Validators can verify every claim directly against transaction hashes.",        example:"Evidence: Drain TX hash, multisig contract address, before/after treasury balance" },
  { icon:Vote,        category:"Governance Abuse",         severity:"High",    title:"Flash loan attacks and governance manipulation",          body:"A wallet temporarily acquires a large voting position via flash loan to pass a malicious proposal. The transaction timing, proposal content, and voting record are all on-chain. GenLayer's ability to reason over multi-step transaction sequences and public governance data is particularly valuable here.", example:"Evidence: Flash loan TX, governance proposal link, vote record, timing correlation" },
  { icon:AlertOctagon,category:"Suspicious Activity",      severity:"Medium",  title:"Insider trading and coordinated front-running",           body:"A wallet moves significant capital into a token hours before a major announcement. The timing pattern is on-chain. The announcement can be timestamped. Callout gives community members a formal way to document the pattern and let validators assess whether the evidence reaches the required threshold.", example:"Evidence: Transaction timestamps vs announcement time, wallet history" },
  { icon:GitFork,     category:"Other Misconduct",         severity:"Low–High",title:"Any other evidence-backed crypto misconduct",            body:"Callout handles any type of on-chain or crypto-native misconduct where evidence exists. If you have receipts — transaction hashes, screenshots, public posts, forum threads — and the evidence directly supports a specific accusation against a specific wallet, Callout is the right place to put it on record.",                   example:"Rule: Bring receipts. Vibes do not count here." },
];

const severityColors: Record<string,string> = {
  "High":"text-danger bg-danger/10 border-danger/20",
  "Medium":"text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Low":"text-success bg-success/10 border-success/20",
  "Low–High":"text-white bg-white/5 border-white/10",
};

export default function UseCasesPage() {
  return (
    <div className="min-h-screen px-4 py-14 bg-[#080808]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#555050] hover:text-orange transition-colors text-sm group mb-10">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          Back to Callout
        </Link>
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-3">Use Cases</span>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight mb-4">What Callout is built for.</h1>
          <p className="text-[#666260] text-base leading-relaxed max-w-xl">Every category below has been seen in the wild. If you have receipts, bring them.</p>
        </div>

        <div className="p-4 bg-[#111111] border border-[#232020] rounded-2xl mb-10 flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <p className="text-white text-sm leading-relaxed">
            <strong className="text-orange">The Callout rule:</strong> Every case must include at least one verifiable, specific piece of evidence. Speculation and rumour are not evidence.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {useCases.map(uc => {
            const Icon = uc.icon;
            return (
              <div key={uc.category} className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-6 hover:border-orange/20 transition-colors">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#555050]">{uc.category}</span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${severityColors[uc.severity]}`}>{uc.severity} Severity</span>
                    </div>
                    <h3 className="font-heading font-bold text-white text-base leading-snug">{uc.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#666260] leading-relaxed mb-3">{uc.body}</p>
                <div className="p-3 bg-[#0C0C0C] border border-[#1E1A18] rounded-xl text-xs text-[#555050] font-mono">{uc.example}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-orange/10 border border-orange/20 rounded-2xl p-6 md:p-8 text-center">
          <h2 className="font-heading font-black text-white text-2xl mb-2">Ready to file?</h2>
          <p className="text-[#666260] text-sm mb-6 max-w-sm mx-auto">If you have a specific, evidence-backed accusation against a crypto wallet, Callout is the right place to put it on record.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/file-case" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-orange text-white font-semibold rounded-xl text-sm shadow-orange hover:bg-orange-hover transition-colors">
              File a Case <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-it-works" className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#333] text-white font-semibold rounded-xl text-sm hover:border-orange hover:text-orange transition-colors">
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
