"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { VerdictType } from "@/data/mockData";

interface VerdictStampProps {
  verdict: VerdictType; confidence?: number;
  className?: string; size?: "sm" | "md" | "lg";
}

const verdictConfig: Record<VerdictType, { text: string; color: string; bg: string; border: string }> = {
  "Claim Valid":                { text: "ON RECORD",    color: "text-orange",  bg: "bg-orange/10",   border: "border-orange/50" },
  "Claim Invalid":              { text: "CLEARED",      color: "text-success", bg: "bg-success/10",  border: "border-success/40" },
  "Inconclusive":               { text: "INCONCLUSIVE", color: "text-[#666]",  bg: "bg-white/5",     border: "border-white/10" },
  "Needs More Evidence":        { text: "INSUFFICIENT", color: "text-amber-400",bg:"bg-amber-500/10",border: "border-amber-500/30" },
  "Malicious Filing":           { text: "REJECTED",     color: "text-danger",  bg: "bg-danger/10",   border: "border-danger/40" },
  "Claim Valid — Uncontested":  { text: "ON RECORD",    color: "text-orange",  bg: "bg-orange/10",   border: "border-orange/50" },
};

export function VerdictStamp({ verdict, confidence, className, size = "md" }: VerdictStampProps) {
  const cfg = verdictConfig[verdict] ?? verdictConfig["Inconclusive"];
  const sizeClasses = { sm: "w-28 h-28", md: "w-40 h-40", lg: "w-56 h-56" };
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -3 }}
      transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
      className={cn("relative inline-flex items-center justify-center", sizeClasses[size], className)}
    >
      <div className={cn("absolute inset-0 rounded-full border-4 opacity-20", cfg.border)} />
      <div className={cn("absolute inset-2 rounded-full border-2 flex items-center justify-center", cfg.bg, cfg.border)}>
        <div className="flex flex-col items-center gap-1 text-center px-2">
          <span className={cn("font-heading font-black uppercase tracking-[0.15em] leading-tight", cfg.color, textSizes[size])}>
            {cfg.text.includes(" ") ? <>{cfg.text.split(" ")[0]}<br />{cfg.text.split(" ").slice(1).join(" ")}</> : cfg.text}
          </span>
          {confidence !== undefined && (
            <span className={cn("font-mono uppercase tracking-widest opacity-60", cfg.color, "text-[10px]")}>
              {confidence}% confidence
            </span>
          )}
          <span className={cn("uppercase tracking-[0.2em] opacity-40 font-medium mt-1", cfg.color, "text-[8px]")}>
            CALLOUT · GENLAYER
          </span>
        </div>
      </div>
    </motion.div>
  );
}
