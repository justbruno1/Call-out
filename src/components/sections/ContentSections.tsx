"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageCircleWarning, FileX, UserX, FilePlus, ShieldCheck, Gavel, Brain, Network, FileSearch, BookCheck, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";

const C = "text-white";
const M = "text-[#666260]";
const CARD = "bg-[#111111] border border-[#232020] rounded-2xl";

// ─── Problem ─────────────────────────────────────────────────────────────────
const problems = [
  { icon: MessageCircleWarning, title: "Rumors spread faster than facts", desc: "Crypto allegations fly on X, Discord, and Telegram with zero accountability. One bad actor can destroy reputations with no evidence." },
  { icon: FileX, title: "Evidence gets lost everywhere", desc: "Screenshots, on-chain data, and public posts are scattered across platforms. There is no single record that ties it all together." },
  { icon: UserX, title: "Bad actors reappear with new wallets", desc: "Without a permanent on-chain reputation record, bad actors simply spin up new wallets and repeat the same patterns." },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">The Problem</span>
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">
            Crypto accountability is still{" "}
            <span className="text-[#666260] italic">vibes-based.</span>
          </h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div className={`${CARD} p-6 h-full hover:border-orange/30 transition-all duration-300`}>
                  <div className="w-11 h-11 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-danger" />
                  </div>
                  <h3 className={`font-heading font-bold ${C} text-lg mb-2`}>{p.title}</h3>
                  <p className={`${M} text-sm leading-relaxed`}>{p.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Solution ─────────────────────────────────────────────────────────────────
const steps = [
  { n: "01", icon: FilePlus, title: "File a case with evidence", desc: "Post a credibility bond and submit your evidence: transaction hashes, screenshots, public posts, and a written accusation." },
  { n: "02", icon: ShieldCheck, title: "Accused gets a defense window", desc: "A countdown starts. The accused can post a defense bond and submit counter-evidence. No response triggers Uncontested Review." },
  { n: "03", icon: Gavel, title: "GenLayer validators issue a verdict", desc: "AI validators review all evidence, public context, and on-chain history. A final verdict is written permanently on-chain." },
];

export function SolutionSection() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-[#0C0C0C]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">The Solution</span>
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">
            Callout turns accusations into cases.
          </h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-5 relative">
          <div className="hidden md:block absolute top-10 left-[calc(33.33%-20px)] right-[calc(33.33%-20px)] h-px bg-[#232020] z-0" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimatedSection key={step.title} delay={i * 0.12} className="relative z-10">
                <div className={`${CARD} p-6 h-full hover:border-orange/30 transition-all duration-300`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center flex-shrink-0 shadow-orange">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-mono text-4xl font-black text-white/5 leading-none mt-1">{step.n}</span>
                  </div>
                  <h3 className={`font-heading font-bold ${C} text-lg mb-2`}>{step.title}</h3>
                  <p className={`${M} text-sm leading-relaxed`}>{step.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── GenLayer ─────────────────────────────────────────────────────────────────
const glFeatures = [
  { icon: Brain, title: "Intelligent Contract Review", desc: "GenLayer Intelligent Contracts can reason over natural language, evidence quality, and case context — not just token balances." },
  { icon: Network, title: "AI Validator Consensus", desc: "Multiple independent AI validators each assess the evidence and reach their own verdict. Consensus determines the final outcome." },
  { icon: FileSearch, title: "Evidence + Public Context", desc: "Validators consider on-chain history, submitted evidence, defense arguments, and publicly available context simultaneously." },
  { icon: BookCheck, title: "On-Chain Verdict Record", desc: "Every verdict is stored permanently on GenLayer — immutable, auditable, and attached to the wallet involved." },
];

export function GenLayerSection() {
  return (
    <section id="genlayer" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-14">
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight max-w-xl">
            Built for trustless judgment.
          </h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 gap-4">
          {glFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className={`${CARD} p-6 hover:border-orange/30 transition-all duration-300 flex gap-4`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#252222] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-heading font-bold ${C} mb-1`}>{f.title}</h3>
                    <p className={`${M} text-sm leading-relaxed`}>{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Workflow ─────────────────────────────────────────────────────────────────
const workflowSteps = [
  { label: "Filer Bond", desc: "Stake test GEN to open case" },
  { label: "Evidence Submitted", desc: "Links, hashes, and context" },
  { label: "Defense Window", desc: "Accused can respond and bond" },
  { label: "GenLayer Review", desc: "AI validators assess both sides" },
  { label: "Verdict", desc: "Final on-chain determination" },
  { label: "Reputation Record", desc: "Permanently attached to wallet" },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 px-4 bg-[#0C0C0C]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">Bonded Court Workflow</span>
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">Every case carries a cost.</h2>
          <p className={`${M} text-base mt-4 max-w-xl mx-auto`}>Credibility bonds ensure that only serious, evidence-backed cases enter the court.</p>
        </AnimatedSection>
        <div className="flex flex-col md:flex-row items-start gap-0 overflow-x-auto pb-4">
          {workflowSteps.map((step, i) => (
            <React.Fragment key={step.label}>
              <AnimatedSection delay={i * 0.1} className="flex-1 min-w-[140px]">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-10 h-10 rounded-full border-2 border-orange bg-orange/10 flex items-center justify-center mb-3 font-mono font-bold text-orange text-sm">{i + 1}</div>
                  <h4 className={`font-heading font-bold ${C} text-sm mb-1`}>{step.label}</h4>
                  <p className={`${M} text-xs`}>{step.desc}</p>
                </div>
              </AnimatedSection>
              {i < workflowSteps.length - 1 && (
                <div className="hidden md:flex items-center justify-center self-center flex-shrink-0 mt-[-10px]">
                  <ArrowRight className="w-4 h-4 text-[#2A2525]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <AnimatedSection delay={0.3} className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { title: "Filer Wins", color: "border-success/30 bg-success/5", rules: ["Bond returned to filer", "Part of defense bond awarded", "Accused gets reputation mark"] },
            { title: "Accused Wins", color: "border-blue-500/30 bg-blue-500/5", rules: ["Defense bond returned", "Part of filing bond awarded", "Accused may receive Cleared mark"] },
            { title: "Inconclusive", color: "border-[#252222] bg-[#111111]", rules: ["Most of both bonds returned", "Small validator fee deducted", "No harsh reputation mark issued"] },
          ].map((rule) => (
            <div key={rule.title} className={`rounded-2xl border p-5 ${rule.color}`}>
              <h4 className={`font-heading font-bold ${C} text-sm mb-3`}>{rule.title}</h4>
              <ul className="space-y-2">
                {rule.rules.map((r) => (
                  <li key={r} className={`flex items-start gap-2 text-xs ${M}`}>
                    <span className="w-1 h-1 rounded-full bg-[#555050] mt-1.5 flex-shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Defense Window ───────────────────────────────────────────────────────────
export function DefenseWindowSection() {
  return (
    <section id="defense-window" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">Defense Window</span>
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight mb-4">The accused gets time to respond.</h2>
          <p className={`${M} text-base leading-relaxed max-w-lg mx-auto`}>When a case is filed, a defense window opens. The accused can submit counter-evidence and post a defense bond.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className={`${CARD} p-8 md:p-10`}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`font-heading font-bold ${C} text-lg mb-4`}>Two possible outcomes</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-1.5 flex-shrink-0" />
                    <div>
                      <p className={`font-medium ${C} text-sm`}>Defense Submitted</p>
                      <p className={`${M} text-xs mt-0.5`}>Case becomes Contested. GenLayer reviews both sides equally.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange mt-1.5 flex-shrink-0" />
                    <div>
                      <p className={`font-medium ${C} text-sm`}>No Response → Uncontested Review</p>
                      <p className={`${M} text-xs mt-0.5`}>Silence is not guilt. GenLayer reviews only the filer's evidence. Evidence must still meet the bar.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0C0C0C] rounded-2xl border border-[#232020] p-6">
                <p className="text-xs uppercase tracking-widest text-[#555050] mb-3">Window Duration</p>
                <div className="space-y-2">
                  {[["Low Severity","24 hours"],["Medium Severity","48 hours"],["High Severity","72 hours"]].map(([k,v])=>(
                    <div key={k} className="flex justify-between text-sm">
                      <span className={M}>{k}</span>
                      <span className={`font-medium ${C}`}>{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm pt-2 border-t border-[#232020]">
                    <span className="text-orange font-medium">Demo Mode</span>
                    <span className="font-medium text-orange">60 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
