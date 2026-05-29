"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Shield, Clock, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { cn, shortenAddress, formatBond } from "@/lib/utils";
import type { Case } from "@/data/mockData";

interface CaseCardProps { caseData: Case; className?: string; index?: number; }

export function CaseCard({ caseData, className, index = 0 }: CaseCardProps) {
  const isActive = new Date(caseData.defenseDeadline) > new Date();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, borderColor: "rgba(255,90,31,0.3)" }}
      className={cn("bg-[#111111] border border-[#232020] rounded-2xl p-5 transition-all duration-300", className)}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-orange" />
          </div>
          <div>
            <p className="font-mono text-xs text-[#555050] uppercase tracking-wider">{caseData.id}</p>
            <p className="font-heading font-semibold text-sm text-white mt-0.5">{caseData.category}</p>
          </div>
        </div>
        <StatusBadge status={caseData.status} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-[#555050] uppercase tracking-wider">Accused</span>
        <span className="font-mono text-xs font-medium text-white bg-[#0C0C0C] px-2 py-0.5 rounded-md border border-[#232020]">
          {shortenAddress(caseData.accused, 6)}
        </span>
      </div>

      <p className="text-sm text-[#666260] line-clamp-2 mb-4 leading-relaxed">{caseData.accusation}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Stat label="Filing Bond" value={formatBond(caseData.filingBond)} icon={<Shield className="w-3 h-3" />} />
        <Stat label="Evidence" value={`${caseData.evidenceCount} items`} icon={<FileText className="w-3 h-3" />} />
        <Stat label="Defense Bond" value={caseData.defenseBond ? formatBond(caseData.defenseBond) : "—"} icon={<Shield className="w-3 h-3" />} />
      </div>

      {isActive && caseData.status === "Awaiting Defense" && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-[#555050] uppercase tracking-wider mb-0.5">Defense Window</p>
            <CountdownTimer deadline={caseData.defenseDeadline} isDemoMode compact />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-[#1E1A18]">
        <span className={cn("text-xs uppercase tracking-wider font-medium",
          caseData.severity === "High" ? "text-danger" : caseData.severity === "Medium" ? "text-amber-400" : "text-success")}>
          {caseData.severity} Severity
        </span>
        <Link href={`/case/${caseData.id}`}>
          <motion.span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange hover:underline cursor-pointer"
            whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}>
            View Case <ExternalLink className="w-3 h-3" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-[#0C0C0C] rounded-xl p-2.5 border border-[#1E1A18]">
      <div className="flex items-center gap-1 text-[#555050] mb-1">{icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="font-medium text-xs text-white">{value}</p>
    </div>
  );
}
