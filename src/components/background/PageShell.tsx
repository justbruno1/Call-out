import React from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("min-h-screen bg-[#080808] relative overflow-x-hidden", className)}>
      <CaseGridBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function CaseGridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      {/* Subtle dark grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, #FF5A1F 40px)",
        }}
      />
      <div className="absolute top-0 bottom-0 left-[72px] w-px bg-orange/5" />
    </div>
  );
}

export function StampWatermark({
  text = "ON RECORD",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute pointer-events-none select-none", className)} aria-hidden>
      <span
        className="font-heading font-black text-[120px] leading-none uppercase tracking-[0.25em] text-orange/5 rotate-[-20deg] block"
        style={{ letterSpacing: "0.25em" }}
      >
        {text}
      </span>
    </div>
  );
}

export function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("relative", className)}>{children}</div>;
}
