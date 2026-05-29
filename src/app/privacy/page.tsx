import React from "react";
import Link from "next/link";

export const metadata = { title: "Privacy Policy — Callout" };

const sections = [
  { title: "1. Overview", body: "Callout is a decentralized, on-chain reputation protocol powered by GenLayer. This Privacy Policy explains how we handle information when you use the Callout web application. Because Callout is built on a public blockchain, some information you submit is inherently public and permanent. Please read this carefully before using the protocol." },
  { title: "2. Information That Is Public by Design", body: "When you file a case, submit a defense, or interact with the Callout protocol, the following information is written permanently to the GenLayer blockchain and is visible to anyone:\n\n• Your connected wallet address (as filer or accused)\n• The case ID, category, severity, and accusation text\n• All evidence links and transaction hashes you submit\n• Your defense text and defense evidence (if submitted)\n• The final verdict, confidence score, and validator reasoning\n• Bond amounts posted and all timestamps\n\nThis data cannot be deleted or hidden once committed on-chain. Do not submit any information you are not comfortable making permanently public." },
  { title: "3. Information We Collect Off-Chain", body: "The Callout web application may collect the following limited off-chain data:\n\n• Email address: If you subscribe to protocol updates, used solely for that purpose. We do not sell or share it.\n• Analytics: Privacy-respecting analytics with no third-party ad tracking.\n• Browser and device data: Standard server logs retained no longer than 30 days." },
  { title: "4. Wallet Connections", body: "Callout connects to your crypto wallet solely to sign transactions and verify your identity on-chain. We do not store your private keys, seed phrases, or wallet credentials. Your wallet interaction is governed by the wallet provider's own terms." },
  { title: "5. How We Use Your Information", body: "Off-chain information we collect is used only for:\n\n• Delivering protocol update emails (if subscribed)\n• Improving the App's performance and user experience\n• Monitoring for abuse, spam, or malicious activity\n• Complying with applicable legal obligations\n\nWe do not sell, rent, or share your off-chain personal information with third parties for marketing purposes, ever." },
  { title: "6. Blockchain Immutability", body: "Any information written to the GenLayer blockchain through your interaction with Callout is permanent and cannot be removed. Callout has no ability to delete or modify on-chain records. If you submit false, defamatory, or privacy-violating content to the blockchain, you do so at your own risk and legal responsibility." },
  { title: "7. Third-Party Services", body: "The App may contain links to external sites including the GenLayer faucet, block explorers, and social media platforms. These third parties have their own privacy policies. Callout is not responsible for third-party privacy practices." },
  { title: "8. Children's Privacy", body: "Callout is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors." },
  { title: "9. Changes to This Policy", body: "We may update this Privacy Policy from time to time. When we make material changes, we will update the effective date and notify users via the App where appropriate." },
  { title: "10. Contact", body: "For questions about this Privacy Policy, contact us via X at x.com/call__out or via GitHub at github.com/justbruno1." },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-14 bg-[#080808]">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#555050] hover:text-orange transition-colors text-sm group mb-10">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          Back to Callout
        </Link>
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-3">Legal</span>
          <h1 className="font-heading font-black text-white text-4xl leading-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#555050]">Effective date: 26 May 2026 · Callout Protocol</p>
        </div>
        <div className="p-4 bg-orange/10 border border-orange/20 rounded-2xl mb-10 text-sm text-white leading-relaxed">
          <strong className="text-orange">Important:</strong> Information you submit when filing or defending a case is written permanently to the GenLayer blockchain and is visible to everyone.
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
          <Link href="/terms" className="text-sm text-orange hover:underline">Read Terms of Service →</Link>
          <Link href="/" className="text-sm text-[#555050] hover:text-orange transition-colors">Back to Callout</Link>
        </div>
      </div>
    </div>
  );
}
