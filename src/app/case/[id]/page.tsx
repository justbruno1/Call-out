"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, FileText, Clock, ExternalLink, AlertCircle, CheckCircle, Hash } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { ValidatorCard } from "@/components/cards/ValidatorCard";
import { VerdictStamp } from "@/components/cards/VerdictStamp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { mockCases, type Case } from "@/data/mockData";
import { shortenAddress, formatBond } from "@/lib/utils";

export default function CaseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [defenseExpired, setDefenseExpired] = useState(false);
  const [showDefenseForm, setShowDefenseForm] = useState(false);
  const [defenseText, setDefenseText] = useState("");
  const [isSubmittingDefense, setIsSubmittingDefense] = useState(false);
  const [defenseSubmitted, setDefenseSubmitted] = useState(false);

  useEffect(() => {
    const found = mockCases.find(c => c.id === id);
    if (found) { setCaseData(found); setDefenseExpired(new Date(found.defenseDeadline) < new Date()); }
  }, [id]);

  if (!caseData) return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808]">
      <div className="text-center">
        <p className="text-[#555050] text-lg mb-2">Case not found</p>
        <Link href="/docket" className="text-orange hover:underline text-sm">Back to Public Docket</Link>
      </div>
    </div>
  );

  const isActive = !defenseExpired && caseData.status === "Awaiting Defense";
  const hasVerdict = !!caseData.verdict;
  const isUnderReview = caseData.status === "Under GenLayer Review" || caseData.status === "Uncontested Review";

  const handleSubmitDefense = async () => {
    if (!defenseText.trim()) return;
    setIsSubmittingDefense(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmittingDefense(false);
    setDefenseSubmitted(true);
    setShowDefenseForm(false);
  };

  const CARD = "bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl";

  return (
    <div className="min-h-screen px-4 py-12 bg-[#080808]">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-8">
          <Link href="/docket" className="inline-flex items-center gap-2 text-[#555050] hover:text-orange transition-colors text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />Public Docket
          </Link>
        </AnimatedSection>

        <AnimatedSection className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm text-[#555050] uppercase tracking-wider">{caseData.id}</span>
                <StatusBadge status={defenseSubmitted ? "Defense Submitted" : caseData.status} />
              </div>
              <h1 className="font-heading font-black text-white text-3xl md:text-4xl leading-tight mb-2">{caseData.category}</h1>
              <div className="flex items-center gap-3 text-sm text-[#555050]">
                <span className={caseData.severity==="High"?"text-danger font-semibold":caseData.severity==="Medium"?"text-amber-400 font-semibold":"text-success font-semibold"}>
                  {caseData.severity} Severity
                </span>
                <span>·</span><span>{new Date(caseData.createdAt).toLocaleDateString()}</span>
                <span>·</span><span>{caseData.evidenceCount} evidence items</span>
              </div>
            </div>
            {hasVerdict && <VerdictStamp verdict={caseData.verdict!} confidence={caseData.confidence ?? undefined} size="md" />}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05} className="mb-6">
          <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span><strong>Demo Mode:</strong> 60-second defense window. Production: 24–72 hours based on severity.</span>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Accusation */}
            <AnimatedSection delay={0.1}>
              <SectionCard title="Accusation" icon={FileText}>
                <p className="text-sm text-[#888480] leading-relaxed">{caseData.accusation}</p>
              </SectionCard>
            </AnimatedSection>

            {/* Evidence */}
            <AnimatedSection delay={0.15}>
              <SectionCard title="Evidence Submitted" icon={Hash}>
                <div className="space-y-3">
                  {caseData.evidenceLinks.map((link, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#0C0C0C] border border-[#1E1A18] rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-orange/10 border border-orange/20 flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="w-3.5 h-3.5 text-orange" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-wider text-[#555050] mb-0.5">Evidence {i+1}</p>
                        <a href={link} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-xs text-white hover:text-orange truncate block transition-colors">{link}</a>
                      </div>
                    </div>
                  ))}
                  {caseData.transactionHashes.map((hash, i) => (
                    <div key={`h-${i}`} className="flex items-center gap-3 p-3 bg-[#0C0C0C] border border-[#1E1A18] rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-[#252222] flex items-center justify-center flex-shrink-0">
                        <Hash className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-wider text-[#555050] mb-0.5">Transaction Hash</p>
                        <p className="font-mono text-xs text-white truncate">{hash}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </AnimatedSection>

            {/* Defense */}
            <AnimatedSection delay={0.2}>
              <SectionCard title="Defense" icon={Shield}>
                {defenseSubmitted ? (
                  <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                    className="p-4 bg-success/10 border border-success/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-success">Defense Submitted</span>
                    </div>
                    <p className="text-sm text-[#888480] leading-relaxed">{defenseText}</p>
                  </motion.div>
                ) : caseData.defenseText ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3 p-2.5 bg-success/10 border border-success/20 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs font-medium text-success uppercase tracking-wider">Defense Submitted</span>
                    </div>
                    <p className="text-sm text-[#888480] leading-relaxed">{caseData.defenseText}</p>
                  </div>
                ) : isActive && !defenseExpired ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-300">
                      The accused has not yet submitted a defense. The defense window is open.
                    </div>
                    {showDefenseForm ? (
                      <motion.div initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:"auto" }} className="space-y-3">
                        <textarea value={defenseText} onChange={e => setDefenseText(e.target.value)}
                          placeholder="Submit your counter-evidence and defense argument..."
                          rows={5} className="w-full p-3 bg-[#0C0C0C] border border-[#252222] text-white rounded-xl text-sm focus:outline-none focus:border-orange resize-none placeholder:text-[#444040]" />
                        <div className="flex gap-2">
                          <motion.button onClick={handleSubmitDefense} disabled={isSubmittingDefense || !defenseText.trim()}
                            className="flex-1 py-3 bg-orange text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                            whileHover={{ scale:0.97 }} whileTap={{ scale:0.95 }}>
                            {isSubmittingDefense ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Staking bond...</> : "Stake 10 tGEN and Defend"}
                          </motion.button>
                          <motion.button onClick={() => setShowDefenseForm(false)}
                            className="px-4 py-3 border border-[#252222] text-[#555050] rounded-xl text-sm hover:border-[#444] hover:text-white transition-colors"
                            whileHover={{ scale:0.97 }} whileTap={{ scale:0.95 }}>Cancel</motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button onClick={() => setShowDefenseForm(true)}
                        className="w-full py-3 border-2 border-[#333] text-white rounded-xl text-sm font-semibold hover:border-orange hover:text-orange transition-colors"
                        whileHover={{ scale:0.97 }} whileTap={{ scale:0.95 }}>Stake GEN and Defend</motion.button>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-[#111111] border border-[#1E1A18] rounded-xl">
                    <p className="text-sm text-white font-medium mb-1">Defense Window Expired</p>
                    <p className="text-xs text-[#555050]">Case moved to Uncontested GenLayer Review. Silence does not automatically prove guilt.</p>
                  </div>
                )}
              </SectionCard>
            </AnimatedSection>

            {/* Validators */}
            {caseData.validators && caseData.validators.length > 0 && (
              <AnimatedSection delay={0.25}>
                <SectionCard title="GenLayer Validator Review" icon={Shield}>
                  {isUnderReview && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400 mb-4 flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      GenLayer validators are reviewing this case.
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {caseData.validators.map((v, i) => <ValidatorCard key={v.name} validator={v} index={i} />)}
                  </div>
                </SectionCard>
              </AnimatedSection>
            )}

            {/* Verdict */}
            {hasVerdict && (
              <AnimatedSection delay={0.3}>
                <SectionCard title="Final Verdict" icon={CheckCircle}>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <VerdictStamp verdict={caseData.verdict!} confidence={caseData.confidence ?? undefined} size="md" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <StatusBadge status={caseData.verdict!} />
                        {caseData.confidence && <span className="text-xs font-mono text-[#555050]">{caseData.confidence}% confidence</span>}
                      </div>
                      <p className="text-sm text-[#888480] leading-relaxed mb-4">{caseData.reasoning}</p>
                      <div className="p-3 bg-[#0C0C0C] border border-[#1E1A18] rounded-xl text-xs text-[#555050]">
                        Stamped on-chain. This record is permanent.<br />Powered by GenLayer trustless decision-making.
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </AnimatedSection>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {isActive && (
              <AnimatedSection delay={0.1}>
                <div className="bg-[#0E0E0E] border border-amber-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Defense Window</span>
                  </div>
                  <CountdownTimer deadline={caseData.defenseDeadline} isDemoMode onExpire={() => setDefenseExpired(true)} />
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection delay={0.15}>
              <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Case Details</h3>
                {[
                  ["Case ID", caseData.id, true, undefined],
                  ["Accused", shortenAddress(caseData.accused, 6), true, `/wallet/${caseData.accused}`],
                  ["Filer", caseData.filer, true, undefined],
                  ["Category", caseData.category, false, undefined],
                  ["Severity", caseData.severity, false, undefined],
                  ["Filing Bond", formatBond(caseData.filingBond), true, undefined],
                  ["Defense Bond", caseData.defenseBond ? formatBond(caseData.defenseBond) : "—", true, undefined],
                  ["Filed", new Date(caseData.createdAt).toLocaleDateString(), false, undefined],
                ].map(([label, value, mono, link]) => (
                  <div key={label as string} className="flex items-start justify-between gap-2">
                    <span className="text-xs text-[#555050] uppercase tracking-wider flex-shrink-0">{label as string}</span>
                    {link ? (
                      <Link href={link as string} className={`text-xs text-orange hover:underline text-right ${mono ? "font-mono" : "font-medium"}`}>{value as string}</Link>
                    ) : (
                      <span className={`text-xs text-white text-right ${mono ? "font-mono" : "font-medium"}`}>{value as string}</span>
                    )}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex items-center justify-center gap-2 p-3 bg-orange/5 border border-orange/10 rounded-xl">
                <span className="text-xs text-[#555050]">Powered by</span>
                <span className="text-xs font-bold text-white">GenLayer</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1E1A18]">
        <Icon className="w-4 h-4 text-orange" />
        <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}
