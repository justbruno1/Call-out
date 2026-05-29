"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets } from "lucide-react";
import { MetricCard } from "@/components/cards/MetricCard";
import { CaseCard } from "@/components/cards/CaseCard";
import { WalletCard } from "@/components/cards/WalletCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { metrics, mockCases, demoWallet } from "@/data/mockData";

const FAUCET_URL = process.env.NEXT_PUBLIC_GENLAYER_FAUCET_URL || "#faucet";
const M = "text-[#666260]";

// ─── Metrics ──────────────────────────────────────────────────────────────────
export function MetricsSection() {
  return (
    <section id="metrics" className="py-24 px-4 bg-[#0C0C0C]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">Protocol Stats</span>
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">Accountability, made measurable.</h2>
          <p className={`${M} text-sm mt-3`}>Demo metrics for hackathon preview. · Updated in real-time on mainnet.</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard value={metrics.casesFiled} label="Cases Filed" index={0} />
          <MetricCard value={metrics.casesResolved} label="Cases Resolved" index={1} />
          <MetricCard value={metrics.walletsOnRecord} label="Wallets On Record" highlight index={2} />
          <MetricCard value={metrics.evidenceCompletionRate} label="Evidence Completion" suffix="%" index={3} />
          <MetricCard value={metrics.defenseResponses} label="Defense Responses" index={4} />
          <MetricCard value={metrics.validClaims} label="Valid Claims" suffix="%" index={5} />
          <MetricCard value={metrics.inconclusive} label="Inconclusive" suffix="%" index={6} />
          <MetricCard value={metrics.clearedWallets} label="Cleared Wallets" index={7} />
        </div>
      </div>
    </section>
  );
}

// ─── Docket Preview ───────────────────────────────────────────────────────────
export function DocketPreviewSection() {
  return (
    <section id="docket" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">Public Docket</span>
            <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">Active cases.</h2>
          </div>
          <Link href="/docket">
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-3 border-2 border-[#333] text-white rounded-xl font-medium text-sm hover:border-orange hover:text-orange transition-colors cursor-pointer"
              whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}
            >
              View All Cases <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockCases.slice(0, 3).map((c, i) => <CaseCard key={c.id} caseData={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Wallet Preview ───────────────────────────────────────────────────────────
export function WalletPreviewSection() {
  return (
    <section id="wallet-preview" className="py-24 px-4 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">Wallet Reputation</span>
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">Every wallet has a record.</h2>
          <p className={`${M} text-base mt-4 max-w-md mx-auto`}>Verdicts become permanent reputation marks attached to wallet addresses.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="max-w-sm mx-auto">
          <WalletCard wallet={demoWallet} />
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Faucet ───────────────────────────────────────────────────────────────────
export function FaucetSection() {
  return (
    <section id="faucet" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="bg-[#111111] border border-[#232020] rounded-3xl p-10 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-orange/3 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-orange mx-auto flex items-center justify-center mb-6 shadow-orange">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-heading font-black text-white text-3xl md:text-4xl mb-3">Testing Callout?</h2>
              <h3 className="font-heading font-bold text-orange text-xl mb-4">Get test GEN first.</h3>
              <p className={`${M} text-base leading-relaxed mb-8 max-w-md mx-auto`}>
                Callout uses test GEN bonds during development so users can file and defend cases without real financial risk.
              </p>
              <motion.a
                href={FAUCET_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white font-semibold rounded-xl text-sm shadow-orange"
                whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}
              >
                <Droplets className="w-4 h-4" />Get Test GEN<ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
export function FinalCTASection() {
  return (
    <section id="cta" className="py-24 px-4 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-heading font-black text-white leading-tight mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
            Crypto does not need more rumors.
            <br /><span className="text-orange">It needs a record.</span>
          </h2>
          <p className={`${M} text-lg mb-10 max-w-lg mx-auto`}>
            Callout is a bonded reputation court on GenLayer where evidence-backed accusations are judged by decentralized AI validators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/file-case">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white font-semibold rounded-xl text-base shadow-orange cursor-pointer"
                whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}
              >
                File a Case <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
            <Link href="/docket">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#333] text-white font-semibold rounded-xl text-base hover:border-orange hover:text-orange transition-colors cursor-pointer"
                whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}
              >
                Explore Public Docket
              </motion.span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
