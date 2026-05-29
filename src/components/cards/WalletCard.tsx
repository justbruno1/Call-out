"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn, shortenAddress } from "@/lib/utils";
import type { WalletProfile } from "@/data/mockData";

const statusConfig = {
  Clean: { icon: CheckCircle, color: "text-success", bg: "bg-success/10 border-success/20", label: "CLEAN RECORD" },
  Challenged: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", label: "UNDER REVIEW" },
  Flagged: { icon: AlertTriangle, color: "text-danger", bg: "bg-danger/10 border-danger/20", label: "FLAGGED" },
  Cleared: { icon: CheckCircle, color: "text-success", bg: "bg-success/10 border-success/20", label: "CLEARED" },
};
const riskColors = { "Low Risk":"text-success","Medium Risk":"text-amber-400","High Risk":"text-danger","Verified Clean":"text-success" };

export function WalletCard({ wallet, className }: { wallet: WalletProfile; className?: string }) {
  const cfg = statusConfig[wallet.status];
  const Icon = cfg.icon;
  return (
    <motion.div whileHover={{ y: -2 }} className={cn("bg-[#111111] border border-[#232020] rounded-2xl overflow-hidden", className)}>
      <div className={`px-5 py-3 flex items-center gap-2 border-b border-[#1E1A18] ${cfg.bg}`}>
        <Icon className={`w-4 h-4 ${cfg.color}`} />
        <span className={`text-xs font-semibold uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-[#555050] uppercase tracking-wider mb-1">Wallet Address</p>
            <p className="font-mono font-semibold text-white text-sm">{shortenAddress(wallet.address, 8)}</p>
          </div>
          <Link href={`/wallet/${wallet.address}`}>
            <motion.span className="flex items-center gap-1 text-xs text-orange hover:underline cursor-pointer" whileHover={{ scale: 0.97 }}>
              View Profile <ExternalLink className="w-3 h-3" />
            </motion.span>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="font-heading font-bold text-xl text-white">{wallet.reputationScore}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#555050]">Rep Score</p>
          </div>
          <div className="text-center border-x border-[#1E1A18]">
            <p className="font-heading font-bold text-xl text-white">{wallet.openCases}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#555050]">Open Cases</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-xl text-white">{wallet.resolvedCases}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#555050]">Resolved</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1E1A18]">
          <span className="text-[#555050] uppercase tracking-wider">Risk</span>
          <span className={`font-semibold uppercase tracking-wider ${riskColors[wallet.riskLabel]}`}>{wallet.riskLabel}</span>
        </div>
        {wallet.onChainRecordHash && (
          <div className="mt-3 p-2.5 bg-[#0C0C0C] rounded-xl border border-[#1E1A18]">
            <p className="text-[10px] uppercase tracking-wider text-[#555050] mb-1">On-Chain Record</p>
            <p className="font-mono text-[10px] text-white truncate">{wallet.onChainRecordHash}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
