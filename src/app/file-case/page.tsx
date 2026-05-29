"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, Plus, Minus, ArrowRight, FileText, CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = ["Rug pull","Fake claims","Stolen funds","Undelivered work","Impersonation","Suspicious wallet activity","Governance abuse","Other misconduct"];
const bondAmounts = { Low: 5, Medium: 10, High: 25 };

export default function FileCasePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    accused: "", category: "", severity: "Medium" as "Low"|"Medium"|"High",
    accusation: "", evidenceLinks: [""], transactionHashes: [""], publicContextUrl: "",
  });

  const bond = bondAmounts[form.severity];
  const updateField = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));
  const addLink = () => setForm(p => ({ ...p, evidenceLinks: [...p.evidenceLinks, ""] }));
  const removeLink = (i: number) => setForm(p => ({ ...p, evidenceLinks: p.evidenceLinks.filter((_,idx) => idx !== i) }));
  const updateLink = (i: number, v: string) => { const l=[...form.evidenceLinks]; l[i]=v; setForm(p=>({...p,evidenceLinks:l})); };
  const addHash = () => setForm(p => ({ ...p, transactionHashes: [...p.transactionHashes, ""] }));
  const removeHash = (i: number) => setForm(p => ({ ...p, transactionHashes: p.transactionHashes.filter((_,idx) => idx !== i) }));
  const updateHash = (i: number, v: string) => { const h=[...form.transactionHashes]; h[i]=v; setForm(p=>({...p,transactionHashes:h})); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => router.push("/case/CLT-2026-001"), 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#080808]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success mx-auto flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-heading font-black text-white text-3xl mb-3">Case Filed</h2>
          <p className="text-[#666260] mb-2">Your case has been stamped onto the public docket.</p>
          <p className="text-xs text-[#444040] mb-6">Redirecting to case detail...</p>
          <div className="p-4 bg-orange/10 border border-orange/30 rounded-2xl text-left">
            <p className="text-xs text-[#555050] uppercase tracking-wider mb-1">Case ID</p>
            <p className="font-mono font-bold text-white">CLT-2026-NEW</p>
            <p className="text-xs text-[#555050] mt-2 uppercase tracking-wider mb-1">Bond Staked</p>
            <p className="font-mono font-bold text-orange">{bond} tGEN</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 bg-[#111111] border border-[#252222] text-white rounded-xl text-sm focus:outline-none focus:border-orange transition-colors placeholder:text-[#444040]";

  return (
    <div className="min-h-screen px-4 py-12 bg-[#080808]">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection className="mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-3">File a Case</span>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl leading-tight mb-3">Bring receipts.</h1>
          <p className="text-[#666260] text-base">Vibes do not count here. Post a credibility bond and file an evidence-backed case.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-8">
          <div className="flex gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-300 space-y-1">
              <p className="font-medium">Before you file:</p>
              <p>Unsupported or malicious filings may lose their bond. Your case becomes part of the public docket.</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="bg-[#0E0E0E] border border-[#1E1A18] rounded-3xl p-6 md:p-8 space-y-6">

            <Field label="Accused Wallet Address" required>
              <input type="text" value={form.accused} onChange={e => updateField("accused", e.target.value)}
                placeholder="0x..." className={`${inputCls} font-mono`} />
            </Field>

            <Field label="Accusation Category" required>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(cat => (
                  <motion.button key={cat} type="button" onClick={() => updateField("category", cat)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all border ${
                      form.category === cat ? "bg-orange/10 border-orange text-orange" : "bg-[#111111] border-[#252222] text-[#666260] hover:border-[#444] hover:text-white"
                    }`}
                    whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.96 }}>
                    {cat}
                  </motion.button>
                ))}
              </div>
            </Field>

            <Field label="Severity Level" required>
              <div className="grid grid-cols-3 gap-3">
                {(["Low","Medium","High"] as const).map(sev => (
                  <motion.button key={sev} type="button" onClick={() => updateField("severity", sev)}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                      form.severity === sev
                        ? sev==="High" ? "bg-danger text-white border-danger"
                          : sev==="Medium" ? "bg-amber-500 text-white border-amber-500"
                          : "bg-success text-white border-success"
                        : "bg-[#111111] border-[#252222] text-[#666260] hover:border-[#444]"
                    }`}
                    whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}>
                    {sev}
                    <span className="block text-[10px] font-normal mt-0.5 opacity-80">{bondAmounts[sev]} tGEN bond</span>
                  </motion.button>
                ))}
              </div>
            </Field>

            <Field label="Written Accusation" required>
              <textarea value={form.accusation} onChange={e => updateField("accusation", e.target.value)}
                placeholder="Describe the misconduct in detail. Be specific, factual, and evidence-based."
                rows={5} className={`${inputCls} resize-none`} />
            </Field>

            <Field label="Evidence Links">
              <div className="space-y-2">
                {form.evidenceLinks.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="url" value={link} onChange={e => updateLink(i, e.target.value)}
                      placeholder="https://..." className={`${inputCls} flex-1`} />
                    {form.evidenceLinks.length > 1 && (
                      <button type="button" onClick={() => removeLink(i)}
                        className="p-2.5 rounded-xl border border-[#252222] text-[#555050] hover:text-danger hover:border-danger transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addLink}
                  className="flex items-center gap-2 text-xs text-[#555050] hover:text-orange transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add evidence link
                </button>
              </div>
            </Field>

            <Field label="Transaction Hashes">
              <div className="space-y-2">
                {form.transactionHashes.map((hash, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={hash} onChange={e => updateHash(i, e.target.value)}
                      placeholder="0x..." className={`${inputCls} flex-1 font-mono`} />
                    {form.transactionHashes.length > 1 && (
                      <button type="button" onClick={() => removeHash(i)}
                        className="p-2.5 rounded-xl border border-[#252222] text-[#555050] hover:text-danger hover:border-danger transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addHash}
                  className="flex items-center gap-2 text-xs text-[#555050] hover:text-orange transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add transaction hash
                </button>
              </div>
            </Field>

            <Field label="Public Context URL (optional)">
              <input type="url" value={form.publicContextUrl} onChange={e => updateField("publicContextUrl", e.target.value)}
                placeholder="https://... (forum post, announcement, etc.)" className={inputCls} />
            </Field>

            <div className="p-4 bg-orange/10 border border-orange/30 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange/70 uppercase tracking-wider mb-1">Filing Bond</p>
                  <p className="font-heading font-bold text-2xl text-white">{bond} tGEN</p>
                  <p className="text-xs text-[#555050] mt-1">{form.severity} severity · Returned if claim is valid</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <motion.button type="button" onClick={handleSubmit}
              disabled={isSubmitting || !form.accused || !form.category || !form.accusation}
              className="w-full flex items-center justify-center gap-2 py-4 bg-orange text-white font-semibold rounded-xl text-sm shadow-orange disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.95 }}>
              {isSubmitting ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>Staking bond and filing case...</>
              ) : <>Stake {bond} tGEN and File Case<ArrowRight className="w-4 h-4" /></>}
            </motion.button>
            <p className="text-center text-xs text-[#444040]">Your case becomes part of the public docket and is permanent on-chain.</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-white mb-2">
        {label}{required && <span className="text-orange ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
