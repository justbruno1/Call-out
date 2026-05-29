"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { CaseCard } from "@/components/cards/CaseCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { mockCases } from "@/data/mockData";

const filters = [
  { label: "All Cases", value: "all" },
  { label: "Awaiting Defense", value: "Awaiting Defense" },
  { label: "Under Review", value: "Under GenLayer Review" },
  { label: "Defense Submitted", value: "Defense Submitted" },
  { label: "Verdict Issued", value: "Verdict Issued" },
  { label: "Uncontested", value: "Uncontested Review" },
  { label: "On Record", value: "On Record" },
  { label: "Cleared", value: "Cleared" },
];

export default function DocketPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = mockCases.filter((c) => {
    const matchesFilter = activeFilter === "all" || c.status === activeFilter;
    const matchesSearch = !search ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.accused.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen px-4 py-12 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-3">Public Docket</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight">Active Cases</h1>
              <p className="text-[#666260] text-base mt-2">{mockCases.length} cases on record · Powered by GenLayer</p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555050]" />
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cases, wallets..."
                className="w-full pl-9 pr-4 py-3 bg-[#111111] border border-[#252222] text-white rounded-xl text-sm focus:outline-none focus:border-orange transition-colors placeholder:text-[#444040]"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((f) => (
              <motion.button key={f.value} onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-orange text-white"
                    : "bg-[#111111] border border-[#252222] text-[#666260] hover:text-white hover:border-[#444]"
                }`}
                whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}>
                {f.label}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => <CaseCard key={c.id} caseData={c} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#555050] text-lg mb-2">No cases found</p>
            <p className="text-[#333] text-sm">Try a different filter or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
