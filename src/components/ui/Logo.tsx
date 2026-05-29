import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export function Logo({ size = "md", showTagline = false, className }: LogoProps) {
  const sizes = {
    sm: { mark: 28, text: "text-lg", tagline: "text-[8px]" },
    md: { mark: 36, text: "text-2xl", tagline: "text-[9px]" },
    lg: { mark: 52, text: "text-4xl", tagline: "text-[11px]" },
  };
  const s = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <svg width={s.mark} height={s.mark} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <rect x="2" y="2" width="48" height="48" rx="10" stroke="#FF5A1F" strokeWidth="2.5" fill="#FF5A1F" />
        <path d="M35 14H22C17.5817 14 14 17.5817 14 22V30C14 34.4183 17.5817 38 22 38H35"
          stroke="#080808" strokeWidth="5" strokeLinecap="square" fill="none" />
        <rect x="22" y="14" width="13" height="5" fill="#080808" />
        <rect x="22" y="33" width="13" height="5" fill="#080808" />
        <rect x="30" y="24.5" width="5" height="3" rx="0.5" fill="#FF5A1F" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={cn("font-heading font-bold tracking-tight text-white", s.text)}
          style={{ letterSpacing: "-0.02em" }}>
          Callout
        </span>
        {showTagline && (
          <span className={cn("font-body uppercase tracking-[0.18em] text-[#555050] mt-0.5", s.tagline)}>
            THE CRYPTO ACCOUNTABILITY PROTOCOL
          </span>
        )}
      </div>
    </Link>
  );
}
