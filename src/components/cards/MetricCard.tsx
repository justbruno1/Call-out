"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: number; label: string; suffix?: string; prefix?: string;
  highlight?: boolean; className?: string; index?: number;
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export function MetricCard({ value, label, suffix = "", prefix = "", highlight = false, className, index = 0 }: MetricCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const count = useCountUp(value, 2000, visible);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ y: -3 }}
      className={cn("rounded-2xl p-6 border transition-all duration-300",
        highlight ? "bg-orange border-orange/40 shadow-orange" : "bg-[#111111] border-[#232020]", className)}>
      <div className={cn("text-4xl font-heading font-black tabular-nums mb-2 leading-none", highlight ? "text-white" : "text-white")}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className={cn("text-xs uppercase tracking-widest font-medium", highlight ? "text-white/80" : "text-[#555050]")}>{label}</p>
    </motion.div>
  );
}
