"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  deadline: string; isDemoMode?: boolean;
  onExpire?: () => void; className?: string; compact?: boolean;
}

export function CountdownTimer({ deadline, isDemoMode = false, onExpire, className, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft(0); setExpired(true); onExpire?.(); }
      else setTimeLeft(diff);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [deadline, onExpire]);

  if (expired) {
    return <span className={cn("text-xs font-medium uppercase tracking-wider text-danger", className)}>Window Expired</span>;
  }

  const totalSec = Math.floor(timeLeft / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (compact) {
    return (
      <span className={cn("font-mono text-sm font-semibold text-white tabular-nums", timeLeft < 60000 && "text-danger", className)}>
        {h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`}
      </span>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-2 font-mono text-2xl font-bold tabular-nums text-white">
        {h > 0 && <><span>{pad(h)}</span><span className="text-[#555050] text-lg">h</span></>}
        <span>{pad(m)}</span><span className="text-[#555050] text-lg">m</span>
        <span className={timeLeft < 60000 ? "text-danger" : ""}>{pad(s)}</span>
        <span className="text-[#555050] text-lg">s</span>
      </div>
      {isDemoMode && <p className="text-xs text-[#555050]">Demo Mode: 60-second window · Production: 24–72 hours</p>}
    </div>
  );
}
