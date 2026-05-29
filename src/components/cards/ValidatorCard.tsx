import React from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ValidatorCard as ValidatorCardType } from "@/data/mockData";

export function ValidatorCard({ validator, index = 0 }: { validator: ValidatorCardType; index?: number }) {
  const isReviewing = validator.recommendation === "Reviewing";
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#111111] border border-[#232020] rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-[#252222] flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm text-white leading-tight">{validator.name}</h4>
          {isReviewing ? (
            <span className="inline-flex items-center gap-1.5 mt-1 text-xs text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />Analysis in progress
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 mt-1 text-xs font-medium text-orange uppercase tracking-wider">
              {validator.recommendation}
            </span>
          )}
        </div>
      </div>
      {!isReviewing && (
        <>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#555050] uppercase tracking-wider">Confidence</span>
              <span className="text-xs font-semibold font-mono text-white">{validator.confidence}%</span>
            </div>
            <div className="h-1.5 bg-[#0C0C0C] border border-[#232020] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${validator.confidence}%` }} viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                className={cn("h-full rounded-full", validator.confidence >= 70 ? "bg-orange" : validator.confidence >= 50 ? "bg-amber-400" : "bg-[#333]")}
              />
            </div>
          </div>
          <p className="text-xs text-[#666260] leading-relaxed border-t border-[#1E1A18] pt-3">{validator.reasoning}</p>
        </>
      )}
    </motion.div>
  );
}
