import React from "react";
import Link from "next/link";

export const metadata = { title: "Terms of Service — Callout" };

const sections = [
  { title: "1. Acceptance of Terms", body: "By accessing or using the Callout web application or the Callout protocol (collectively, the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service." },
  { title: "2. Description of the Service", body: "Callout is an on-chain bonded reputation court powered by GenLayer Intelligent Contracts. The Service allows users to file evidence-backed cases against crypto wallet addresses, submit defenses, have cases reviewed by GenLayer AI validators, and view the permanent on-chain public reputation record of wallet addresses.\n\nCallout operates on the GenLayer testnet during its preview phase. All bonds use test GEN tokens which carry no real-world monetary value during this phase." },
  { title: "3. Eligibility", body: "You must be at least 18 years of age to use the Service. By using Callout, you represent that you meet this requirement and have the legal capacity to enter into these Terms in your jurisdiction." },
  { title: "4. Wallet Responsibility", body: "You are solely responsible for the security of your wallet, private keys, and seed phrase. All transactions signed by your wallet address are your responsibility. Callout cannot recover lost wallets, reverse transactions, or act on your behalf." },
  { title: "5. Filing Cases — Your Obligations", body: "When you file a case, you agree that:\n\n• Your accusation is based on genuine, verifiable evidence you believe to be true\n• You are not filing with intent to harass, defame, extort, or harm a party without factual basis\n• All case content is written to a public blockchain and is permanent\n• If your filing is found to be malicious or unsupported, you will lose your credibility bond\n• You are not submitting content that violates applicable law" },
  { title: "6. Bond System and Verdicts", body: "Bonds are staked in test GEN tokens. Bond redistribution follows the verdict: the honest or supported side recovers their bond and may receive a share of the opposing bond. Verdicts issued by GenLayer validator consensus are final on-chain records. Callout does not guarantee any specific verdict outcome." },
  { title: "7. Prohibited Conduct", body: "You agree not to:\n\n• File knowingly false, fabricated, or malicious accusations\n• Harass, threaten, or intimidate any wallet address or individual\n• Submit content that is illegal, defamatory, or violates third-party rights\n• Attempt to manipulate the AI validator consensus process\n• Use automated scripts or bots to interact with the protocol at scale" },
  { title: "8. Intellectual Property", body: "The Callout name, logo, brand identity, and web application code are the property of Callout and its contributors. The Intelligent Contract source code is available under the MIT License at github.com/justbruno1." },
  { title: "9. Disclaimer of Warranties", body: "The Service is provided \"as is\" and \"as available\" without warranties of any kind. Callout does not warrant that the Service will be uninterrupted, error-free, or that verdicts are legally admissible in any jurisdiction. You use the Service entirely at your own risk." },
  { title: "10. Limitation of Liability", body: "To the maximum extent permitted by applicable law, Callout and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service." },
  { title: "11. Changes to the Service and Terms", body: "We reserve the right to modify, suspend, or discontinue any part of the Service at any time. Material changes to these Terms will be communicated via the App or our official X profile." },
  { title: "12. Contact", body: "For questions related to these Terms, contact us via X at x.com/call__out or GitHub at github.com/justbruno1." },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen px-4 py-14 bg-[#080808]">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#555050] hover:text-orange transition-colors text-sm group mb-10">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          Back to Callout
        </Link>
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-3">Legal</span>
          <h1 className="font-heading font-black text-white text-4xl leading-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-[#555050]">Effective date: 26 May 2026 · Callout Protocol</p>
        </div>
        <div className="p-4 bg-white/5 border border-[#252222] rounded-2xl mb-10 text-sm text-white leading-relaxed">
          Please read these Terms carefully before using Callout. By connecting your wallet, you agree to be bound by these terms.
        </div>
        <div className="space-y-4">
          {sections.map(s => (
            <div key={s.title} className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-6">
              <h2 className="font-heading font-bold text-white text-base mb-3">{s.title}</h2>
              <p className="text-sm text-[#888480] leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[#1E1A18] flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/privacy" className="text-sm text-orange hover:underline">Read Privacy Policy →</Link>
          <Link href="/" className="text-sm text-[#555050] hover:text-orange transition-colors">Back to Callout</Link>
        </div>
      </div>
    </div>
  );
}
