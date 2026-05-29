import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps { status: string; className?: string; }

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  "Awaiting Defense":        { bg: "bg-amber-500/10 border border-amber-500/25", text: "text-amber-400", dot: "bg-amber-400" },
  "Under GenLayer Review":   { bg: "bg-blue-500/10 border border-blue-500/25",   text: "text-blue-400",  dot: "bg-blue-400" },
  "Defense Submitted":       { bg: "bg-purple-500/10 border border-purple-500/25",text: "text-purple-400",dot: "bg-purple-400" },
  "Verdict Issued":          { bg: "bg-orange/10 border border-orange/25",        text: "text-orange",    dot: "bg-orange" },
  "Uncontested Review":      { bg: "bg-white/5 border border-white/10",           text: "text-[#888480]", dot: "bg-[#555050]" },
  "On Record":               { bg: "bg-danger/10 border border-danger/25",        text: "text-danger",    dot: "bg-danger" },
  "Cleared":                 { bg: "bg-success/10 border border-success/25",      text: "text-success",   dot: "bg-success" },
  "Claim Valid":             { bg: "bg-orange/10 border border-orange/25",        text: "text-orange",    dot: "bg-orange" },
  "Claim Invalid":           { bg: "bg-success/10 border border-success/25",      text: "text-success",   dot: "bg-success" },
  "Inconclusive":            { bg: "bg-white/5 border border-white/10",           text: "text-[#888480]", dot: "bg-[#555050]" },
  "Needs More Evidence":     { bg: "bg-amber-500/10 border border-amber-500/25",  text: "text-amber-400", dot: "bg-amber-400" },
  "Malicious Filing":        { bg: "bg-danger/10 border border-danger/25",        text: "text-danger",    dot: "bg-danger" },
  "Claim Valid — Uncontested":{ bg:"bg-orange/10 border border-orange/25",        text: "text-orange",    dot: "bg-orange" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { bg: "bg-white/5 border border-white/10", text: "text-[#888480]", dot: "bg-[#555050]" };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium uppercase tracking-wider", config.bg, config.text, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", config.dot)} />
      {status}
    </span>
  );
}
