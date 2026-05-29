import React from "react";
import Link from "next/link";
import { ArrowRight, FilePlus, ShieldCheck, Gavel, Brain, Clock, BookCheck } from "lucide-react";

export const metadata = { title: "How It Works — Callout" };

const steps = [
  { n:"01", icon:FilePlus,    title:"Connect your wallet",          body:"Connect any compatible crypto wallet. Make sure you have test GEN tokens. Use the faucet link in the navbar to get test GEN if you need it." },
  { n:"02", icon:FilePlus,    title:"File a case with evidence",     body:"Go to File a Case. Enter the accused wallet address, accusation category, severity, and a clear written accusation. Attach evidence links and transaction hashes. Choose severity — this sets your credibility bond (5, 10, or 25 test GEN). Submit. Your case is now on the public docket." },
  { n:"03", icon:Clock,       title:"Defense window opens",          body:"A countdown starts the moment a case is filed. The accused wallet has a window to respond — 24h for low, 48h for medium, 72h for high severity (60 seconds in demo mode). If they respond, they post a defense bond and submit counter-evidence. No response triggers Uncontested Review. Silence is not guilt." },
  { n:"04", icon:Brain,       title:"GenLayer validators review",    body:"GenLayer Intelligent Contract validators independently review all evidence, the accusation, transaction hashes, public context, and the defense. Each validator produces its own verdict and confidence score. These reach consensus on-chain. No single party controls the outcome." },
  { n:"05", icon:Gavel,       title:"Verdict is issued",             body:"The consensus verdict is written permanently to GenLayer. Possible verdicts: Claim Valid, Claim Invalid, Inconclusive, Needs More Evidence, Malicious Filing, or Claim Valid — Uncontested. Each includes a confidence score and validator reasoning." },
  { n:"06", icon:ShieldCheck, title:"Bonds settle, reputation updates", body:"Bonds are redistributed based on verdict. The supported party recovers their bond and may receive a portion of the opposing bond. The accused wallet's on-chain reputation profile is updated with the verdict mark." },
  { n:"07", icon:BookCheck,   title:"The record is permanent",       body:"Every verdict is attached permanently to the accused wallet's Callout profile. Anyone can look up any wallet to see its full case history, verdicts, and reputation status. The record cannot be deleted or altered." },
];

const verdicts = [
  { label:"Claim Valid",                color:"bg-orange/10 border-orange/30 text-orange",    desc:"Evidence clearly supports accusation. Filer wins." },
  { label:"Claim Invalid",              color:"bg-success/10 border-success/30 text-success", desc:"Defense clearly rebuts accusation. Accused wins." },
  { label:"Inconclusive",               color:"bg-white/5 border-white/10 text-[#666260]",    desc:"Evidence on both sides insufficient to determine." },
  { label:"Needs More Evidence",        color:"bg-amber-500/10 border-amber-500/30 text-amber-400", desc:"Accusation may have merit but evidence is insufficient." },
  { label:"Malicious Filing",           color:"bg-danger/10 border-danger/30 text-danger",    desc:"Filing appears false or retaliatory. Filer loses bond." },
  { label:"Claim Valid — Uncontested",  color:"bg-orange/10 border-orange/30 text-orange",    desc:"Strong evidence, no defense submitted." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen px-4 py-14 bg-[#080808]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#555050] hover:text-orange transition-colors text-sm group mb-10">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          Back to Callout
        </Link>
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-3">The Protocol</span>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight mb-4">How Callout works.</h1>
          <p className="text-[#666260] text-base leading-relaxed max-w-xl">A seven-step bonded reputation court. Evidence in, validators review, verdict on-chain.</p>
        </div>

        <div className="space-y-4 mb-16">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-6 flex gap-5 hover:border-orange/20 transition-colors">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center shadow-orange">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-mono text-xs text-white/10 font-bold">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-[#666260] leading-relaxed">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-12">
          <h2 className="font-heading font-black text-white text-2xl mb-6">Possible verdict outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {verdicts.map(v => (
              <div key={v.label} className={`rounded-xl border p-4 ${v.color}`}>
                <p className="font-heading font-bold text-sm mb-1">{v.label}</p>
                <p className="text-xs opacity-80 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111111] border border-[#232020] rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="font-heading font-black text-white text-xl mb-4">Bond amounts</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[{label:"Low",amount:"5 tGEN"},{label:"Medium",amount:"10 tGEN"},{label:"High",amount:"25 tGEN"}].map(b=>(
              <div key={b.label} className="bg-white/5 rounded-xl p-4 text-center">
                <p className="font-mono font-bold text-orange text-lg">{b.amount}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{b.label} Severity</p>
              </div>
            ))}
          </div>
          <p className="text-[#444040] text-xs leading-relaxed">All bonds are in test GEN during the testnet phase. The defense bond always matches the filing bond based on severity.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/file-case" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-orange text-white font-semibold rounded-xl text-sm shadow-orange hover:bg-orange-hover transition-colors">
            File a Case <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/docket" className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#333] text-white font-semibold rounded-xl text-sm hover:border-orange hover:text-orange transition-colors">
            Browse Public Docket
          </Link>
        </div>
      </div>
    </div>
  );
}
