"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">

      {/* ── Right-side hero image (Dunner-style) ────────────────── */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%] pointer-events-none select-none">
        <Image
          src="/hero-bg.jpeg"
          alt="Callout — On-Chain Reputation Court"
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 58vw"
        />
        {/* Gradient: left fade so text is readable, bottom & right fade */}
        <div className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #080808 0%, #080808 10%, rgba(8,8,8,0.55) 42%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.3) 20%, transparent 50%)",
          }}
        />
      </div>

      {/* ── Subtle orange ambient glow ───────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(255,90,31,0.05) 0%, transparent 60%)",
        }}
      />

      {/* ── Left-side text content ───────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-orange/30 rounded-full text-xs font-semibold text-orange uppercase tracking-widest mb-8"
            style={{ background: "rgba(255,90,31,0.08)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            On-Chain Reputation Court
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-black text-white leading-[1.02] mb-6"
            style={{ fontSize: "clamp(52px, 7vw, 92px)" }}
          >
            Put bad actors{" "}
            <span
              className="text-orange relative inline-block"
            >
              on record.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-[#888480] text-lg leading-relaxed mb-10 max-w-md"
          >
            Callout turns crypto accusations into bonded, evidence-backed
            cases reviewed by AI validators and stored permanently
            on-chain.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-3 mb-14"
          >
            <Link href="/file-case">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white font-bold rounded-xl text-sm shadow-orange-lg cursor-pointer"
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                File a Case <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/docket">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#333] text-white font-bold rounded-xl text-sm hover:border-orange hover:text-orange transition-colors cursor-pointer"
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                View Public Docket
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-8 pt-6 border-t border-[#1E1A18]"
          >
            {[
              { value: "1,284", label: "Cases Filed" },
              { value: "847", label: "Resolved" },
              { value: "91%", label: "Evidence Complete" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-heading font-bold text-xl text-white">{value}</p>
                <p className="text-xs text-[#666260] uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
