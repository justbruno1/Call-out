"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const productLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Use Cases", href: "/use-cases" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="border-t border-[#1E1A18] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Col 1 — Brand */}
          <div>
            <Logo size="sm" showTagline />
            <p className="text-sm text-[#555050] mt-3 mb-4">Put it on record.</p>
            <div className="flex items-center gap-2.5">
              <motion.a
                href="https://x.com/justbrunoc"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[#252222] flex items-center justify-center text-[#555050] hover:text-white hover:border-white/40 transition-all duration-200"
                whileHover={{ scale: 0.96 }}
                whileTap={{ scale: 0.94 }}
              >
                <XLogo className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                href="https://github.com/justbruno1/Call-out.git"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[#252222] flex items-center justify-center text-[#555050] hover:text-white hover:border-white/40 transition-all duration-200"
                whileHover={{ scale: 0.96 }}
                whileTap={{ scale: 0.94 }}
              >
                <Github className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-3">
              Product
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#555050] hover:text-orange transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Newsletter */}
          <div>
            <p className="text-xs text-[#555050] mb-3 leading-relaxed">
              Get updates on the protocol.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-success/10 border border-success/30 rounded-xl text-xs text-success font-medium"
              >
                ✓ You're on record.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-[#111111] border border-[#252222] text-white rounded-xl focus:outline-none focus:border-orange transition-colors placeholder:text-[#444040]"
                  required
                />
                <motion.button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-orange text-white text-sm font-medium rounded-xl hover:bg-orange-hover transition-colors whitespace-nowrap"
                  whileHover={{ scale: 0.97 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom legal */}
      <div className="border-t border-[#1E1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-[#444040]">© 2026 Callout. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-[#444040] uppercase tracking-wider font-medium">
              System Status: All Operational
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[#444040] hover:text-orange transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-[#444040] hover:text-orange transition-colors">Terms of Service</Link>
            <span className="text-xs text-[#444040]">
              Powered by <span className="font-semibold text-white">GenLayer</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
