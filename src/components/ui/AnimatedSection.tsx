"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  glow?: boolean;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  glow = true,
}: AnimatedSectionProps) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 28 : 0,
    x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
  };

  return (
    <div className={cn("relative", className)}>
      {/* Orange glow that animates in when section enters viewport */}
      {glow && (
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10 rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255,90,31,0.07) 0%, transparent 70%)",
          }}
        />
      )}
      <motion.div
        initial={initial}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
