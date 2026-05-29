"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CaseCard } from "@/components/cards/CaseCard";
import { VerdictStamp } from "@/components/cards/VerdictStamp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { mockWallets, mockCases, demoWallet } from "@/data/mockData";
import { shortenAddress } from "@/lib/utils";

const statusConfig = {
  Clean:     { icon: CheckCircle,  color: "text-success",   bg: "bg-success/10 border-success/20",  label: "CLEAN RECORD" },
  Challenged:{ icon: AlertTriangle,color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20",label:"UNDER REVIEW" },
  Flagged:   { icon: AlertTriangle,color: "text-danger",    bg: "bg-danger/10 border-danger/20",    label: "FLAGGED" },
  Cleared:   { icon: CheckCircle,  color: "text-success",   bg: "bg-success/10 border-success/20",  label: "CLEARED" },
};
const riskColors = { "Low Risk":"text-success","Medium Risk":"text-amber-400","High Risk":"text-danger","Verified Clean":"text-success" };

export default function WalletPage() {
  const params = useParams();
  const address = params?.address as string;
  const wallet = mockWallets[decodeURIComponent(address)] || demoWallet;
  const relatedCases = mockCases.filter(c => c.accused === wallet.address || c.accused === decodeURIComponent(address));
  const cfg = statusConfig[wallet.status];
  const Icon = cfg.icon;
  const isFlagged = wallet.status === "Flagged";
  const isCleared = wallet.status === "Cleared";

  return (
    <div className="min-h-screen px-4 py-12 bg-[#080808]">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-8">
          <Link href="/docket" className="inline-flex items-center gap-2 text-[#555050] hover:text-orange transition-colors text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />Public Docket
          </Link>
        </AnimatedSection>

        <AnimatedSection className="mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-3">Wallet Reputation Profile</span>
          <h1 className="font-mono font-black text-white text-2xl md:text-3xl break-all">{wallet.address}</h1>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <AnimatedSection delay={0.1}>
              <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl overflow-hidden">
                <div className={`px-5 py-4 flex items-center gap-2.5 border-b border-[#1E1A18] ${cfg.bg}`}>
                  <Icon className={`w-5 h-5 ${cfg.color}`} />
                  <span className={`text-sm font-bold uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
                </div>
                <div className="p-5">
                  {(isFlagged || isCleared) && (
                    <div className="flex justify-center mb-5">
                      {isFlagged && relatedCases[0]?.verdict && (
                        <VerdictStamp verdict={relatedCases[0].verdict} confidence={relatedCases[0].confidence ?? undefined} size="sm" />
                      )}
                      {isCleared && <VerdictStamp verdict="Claim Invalid" size="sm" />}
                    </div>
                  )}
                  <div className="text-center mb-5 pb-5 border-b border-[#1E1A18]">
                    <svg className="w-24 h-24 mx-auto" viewBox="0 0 96 96">
                      <circle cx="48" cy="48" r="40" fill="none" stroke="#1E1A18" strokeWidth="6" />
                      <circle cx="48" cy="48" r="40" fill="none"
                        stroke={wallet.reputationScore>=70?"#2E7D5B":wallet.reputationScore>=40?"#F59E0B":"#D9472B"}
                        strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={`${2*Math.PI*40}`}
                        strokeDashoffset={`${2*Math.PI*40*(1-wallet.reputationScore/100)}`}
                        transform="rotate(-90 48 48)" style={{ transition:"stroke-dashoffset 1s ease" }} />
                      <text x="48" y="48" textAnchor="middle" dy="0.35em"
                        style={{ fontFamily:"inherit",fontSize:"20px",fontWeight:900,fill:"#FFFFFF" }}>
                        {wallet.reputationScore}
                      </text>
                    </svg>
                    <p className="text-xs uppercase tracking-wider text-[#555050] mt-2">Reputation Score</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Open Cases", wallet.openCases],
                      ["Resolved Cases", wallet.resolvedCases],
                    ].map(([k,v])=>(
                      <div key={k as string} className="flex justify-between text-sm">
                        <span className="text-[#555050]">{k as string}</span>
                        <span className="font-semibold text-white">{v as number}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#555050]">Risk Level</span>
                      <span className={`font-semibold uppercase text-xs tracking-wider ${riskColors[wallet.riskLabel]}`}>{wallet.riskLabel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#555050]">First Active</span>
                      <span className="font-mono text-xs text-white">{new Date(wallet.joinedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {wallet.onChainRecordHash && (
              <AnimatedSection delay={0.15}>
                <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-orange" />
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-white">On-Chain Record</h3>
                  </div>
                  <p className="font-mono text-[10px] text-white break-all leading-relaxed bg-[#0C0C0C] p-3 rounded-xl border border-[#1E1A18]">
                    {wallet.onChainRecordHash}
                  </p>
                  <p className="text-xs text-[#555050] mt-2">Stamped on-chain. This record is permanent.</p>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection delay={0.2}>
              <Link href="/file-case">
                <motion.span
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#333] text-white rounded-xl text-sm font-semibold hover:border-orange hover:text-orange transition-colors cursor-pointer"
                  whileHover={{ scale:0.97 }} whileTap={{ scale:0.95 }}>
                  <FileText className="w-4 h-4" />File a Case Against This Wallet
                </motion.span>
              </Link>
            </AnimatedSection>
          </div>

          {/* Case history */}
          <div className="md:col-span-2 space-y-6">
            <AnimatedSection delay={0.1}>
              <h2 className="font-heading font-bold text-white text-xl mb-4">Case History</h2>
              {relatedCases.length > 0 ? (
                <div className="space-y-4">
                  {relatedCases.map((c, i) => <CaseCard key={c.id} caseData={c} index={i} />)}
                </div>
              ) : (
                <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <p className="font-heading font-bold text-white mb-1">Clean Record</p>
                  <p className="text-sm text-[#555050]">No cases filed against this wallet address.</p>
                </div>
              )}
            </AnimatedSection>

            {relatedCases.some(c => c.verdict) && (
              <AnimatedSection delay={0.2}>
                <h2 className="font-heading font-bold text-white text-xl mb-4">Verdict Timeline</h2>
                <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-6">
                  <div className="space-y-4">
                    {relatedCases.filter(c => c.verdict && c.resolvedAt).map((c) => (
                      <div key={c.id} className="flex items-start gap-4 pb-4 border-b border-[#1E1A18] last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-orange" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-mono text-xs text-[#555050]">{c.id}</span>
                            <span className="text-xs text-[#555050]">{c.resolvedAt && new Date(c.resolvedAt).toLocaleDateString()}</span>
                          </div>
                          <p className="font-medium text-white text-sm mb-1">{c.category}</p>
                          <StatusBadge status={c.verdict!} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
