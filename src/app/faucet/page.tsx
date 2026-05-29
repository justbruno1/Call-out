"use client";
import React from "react";
import { motion } from "framer-motion";
import { Droplets, ArrowRight, Info, AlertCircle, CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";

const FAUCET_URL = process.env.NEXT_PUBLIC_GENLAYER_FAUCET_URL || "#faucet";

const bondTable = [
  { severity: "Low Severity", bond: "5 tGEN", example: "Impersonation, minor misconduct" },
  { severity: "Medium Severity", bond: "10 tGEN", example: "Fake claims, suspicious activity" },
  { severity: "High Severity", bond: "25 tGEN", example: "Rug pull, stolen funds, governance abuse" },
  { severity: "Defense Bond", bond: "Matches severity", example: "Posted to contest a case" },
];

export default function FaucetPage() {
  return (
    <div className="min-h-screen px-4 py-14 bg-[#080808]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#555050] hover:text-orange transition-colors text-sm group mb-10">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          Back
        </Link>

        <AnimatedSection className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-orange shadow-orange flex items-center justify-center mx-auto mb-6">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">Test Tokens</span>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight mb-4">Get test GEN</h1>
          <p className="text-[#666260] text-base leading-relaxed max-w-md mx-auto">
            You need test GEN to file or defend cases on Callout during the testing phase.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-8">
          <div className="bg-[#111111] border border-[#232020] rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-orange/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="font-heading font-black text-white text-2xl mb-2">GenLayer Faucet</h2>
                <p className="text-[#666260] text-sm leading-relaxed mb-6">
                  Callout uses test GEN bonds during development so users can file and defend cases without real financial risk.
                </p>
                <motion.a href={FAUCET_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-orange text-white font-semibold rounded-xl text-sm shadow-orange"
                  whileHover={{ scale:0.97 }} whileTap={{ scale:0.95 }}>
                  <Droplets className="w-4 h-4" />Open GenLayer Faucet<ArrowRight className="w-4 h-4" />
                </motion.a>
                {!process.env.NEXT_PUBLIC_GENLAYER_FAUCET_URL && (
                  <p className="text-[#333] text-xs mt-3">Add NEXT_PUBLIC_GENLAYER_FAUCET_URL to .env.local</p>
                )}
              </div>
              <div className="w-24 h-24 rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center flex-shrink-0">
                <Droplets className="w-12 h-12 text-orange" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mb-6">
          <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-6">
            <h3 className="font-heading font-bold text-white text-lg mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-orange" />How test GEN bonds work
            </h3>
            <div className="space-y-3 text-sm text-[#666260] leading-relaxed">
              <p>When you file a case, you stake a <strong className="text-white">filing bond</strong> in test GEN based on severity.</p>
              <p>The accused can respond by staking a <strong className="text-white">defense bond</strong>. If they do not respond, the case moves to uncontested review.</p>
              <p>After verdict, bonds are redistributed. The honest party recovers their bond — and may receive a portion of the opposing bond.</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mb-6">
          <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1E1A18]">
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Bond Amounts</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-[#0C0C0C]">
                <tr>
                  {["Case Type","Bond Required","Examples"].map(h=>(
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#555050]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1A18]">
                {bondTable.map(row => (
                  <tr key={row.severity} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-white text-xs">{row.severity}</td>
                    <td className="px-6 py-3.5"><span className="font-mono font-bold text-orange text-xs">{row.bond}</span></td>
                    <td className="px-6 py-3.5 text-[#555050] text-xs hidden sm:table-cell">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex gap-3 p-4 bg-success/10 border border-success/20 rounded-2xl">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success mb-1">No real money at risk</p>
                <p className="text-xs text-[#555050] leading-relaxed">Test GEN is a testnet token with no real-world value.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-orange/10 border border-orange/20 rounded-2xl">
              <AlertCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-orange mb-1">Bonds are still binding</p>
                <p className="text-xs text-[#555050] leading-relaxed">Malicious or unsupported filings can still lose their bond in the demo system.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
