"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const faqs = [
  { q: "What exactly is Callout and who is it for?", a: "Callout is a bonded, on-chain reputation court built on GenLayer. It is for anyone in the crypto ecosystem — developers, investors, DAOs, or community members — who needs to formally document misconduct by a wallet or entity. Instead of posting allegations on social media where they get buried, Callout turns them into permanent, evidence-backed, AI-reviewed records on-chain. If you have receipts, Callout is where you bring them." },
  { q: "What is a credibility bond and why do I need one to file?", a: "A credibility bond is a small stake in test GEN tokens that you lock when opening a case. It exists to prevent spam, false accusations, and bad-faith filings. Because filing a case costs something, only serious, evidence-backed accusations make it onto the docket. If your claim is validated, you get your bond back — and potentially a share of the accused's defense bond. If your claim is found to be malicious or unsupported, you lose the bond. It is accountability in both directions." },
  { q: "What happens if the accused never responds to a case?", a: "If the accused does not submit a defense within the allotted window (24–72 hours in production, 60 seconds in demo mode), the case moves to Uncontested Review — not automatic guilt. GenLayer validators then evaluate only the filer's submitted evidence. If the evidence is strong and specific, the verdict will be Claim Valid — Uncontested. If the evidence is weak or vague, the result may be Inconclusive or Needs More Evidence. Silence alone proves nothing." },
  { q: "How does GenLayer actually decide the verdict?", a: "GenLayer uses Intelligent Contracts — smart contracts that can call AI validators to reason over natural language, evidence links, on-chain transaction data, and public context. Multiple validators independently evaluate the case and each produce their own verdict and confidence score. Consensus across those validators determines the final on-chain outcome. No single party controls the result. The verdict is then stored permanently on GenLayer and attached to the accused wallet's reputation record." },
  { q: "Can a verdict be challenged or reversed after it is issued?", a: "Verdicts issued through GenLayer validator consensus are permanent on-chain records and cannot be deleted. However, if new material evidence emerges, any party can file a follow-up case referencing the original. A subsequent verdict of Claim Invalid on the same wallet can result in a Cleared mark being added to their profile alongside the original record. The original verdict is never erased — the full history remains visible and auditable." },
  { q: "Is my identity private when I file a case?", a: "Callout is a public, on-chain protocol. Your connected wallet address is visible as the filer on the public docket. If you want anonymity, you may choose to file from a wallet that is not publicly linked to your identity — that is your responsibility to manage. The accused wallet address, the accusation, and all submitted evidence are fully public once a case is filed. This transparency is intentional: Callout is a public record, not a private report." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="py-24 px-4 bg-[#0C0C0C]">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">FAQ</span>
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">Common questions.</h2>
          <p className="text-[#666260] text-base mt-4 max-w-md mx-auto">Everything you need to know about filing a case, bonds, verdicts, and the Callout protocol.</p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.07}>
              <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open === i ? "border-orange/30 bg-[#111111]" : "border-[#1E1A18] bg-[#0E0E0E] hover:border-[#2A2525]"}`}>
                <motion.button onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                  whileTap={{ scale: 0.998 }}>
                  <span className={`font-heading font-bold text-base leading-snug transition-colors duration-200 ${open === i ? "text-orange" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-200 ${open === i ? "bg-orange text-white" : "bg-white/5 border border-[#252222] text-[#555050]"}`}>
                    {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div key="answer"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-[#1E1A18] mb-4" />
                        <p className="text-sm text-[#888480] leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
