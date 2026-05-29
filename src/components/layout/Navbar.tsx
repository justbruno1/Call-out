"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Droplets } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { WalletModal } from "@/components/ui/WalletModal";
import { useWallet } from "@/hooks/useWallet";
import { cn } from "@/lib/utils";

const FAUCET_URL = process.env.NEXT_PUBLIC_GENLAYER_FAUCET_URL || "#faucet";

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Public Docket", href: "/docket" },
  { label: "File a Case", href: "/file-case" },
  { label: "Wallet Profile", href: "/wallet/0xA91F4C22B83D91F4C22B" },
];

export function Navbar() {
  const { address, isConnected, isConnecting, connectingId, connect, disconnect } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleConnect = async (walletId: string, walletName: string) => {
    await connect(walletId, walletName);
    setModalOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#1E1A18]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo size="sm" />

            {/* Center links — desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm text-[#888480] hover:text-white rounded-lg transition-all duration-200 font-medium whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right — Faucet + Wallet */}
            <div className="hidden md:flex items-center gap-2">
              {/* Faucet */}
              <motion.a
                href={FAUCET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#888480] border border-[#252222] rounded-xl hover:text-orange hover:border-orange transition-all duration-200"
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.95 }}
              >
                <Droplets className="w-3.5 h-3.5" />
                Get Test GEN
              </motion.a>

              {/* Connect Wallet button */}
              {isConnected ? (
                <motion.button
                  onClick={disconnect}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border-2 border-orange text-orange bg-orange/10 hover:bg-orange/20 transition-all duration-200"
                  whileHover={{ scale: 0.97 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="w-2 h-2 rounded-full bg-success" />
                  {address}
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border-2 border-white/80 text-white hover:bg-orange hover:border-orange transition-all duration-200"
                  whileHover={{ scale: 0.97 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect Wallet
                </motion.button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0C0C0C]/98 backdrop-blur-md border-b border-[#1E1A18] p-4 md:hidden"
          >
            <div className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-[#888480] hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-3 border-t border-[#1E1A18]">
              <a
                href={FAUCET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-[#888480] border border-[#252222] rounded-xl"
              >
                <Droplets className="w-4 h-4" />
                Get Test GEN
              </a>
              {isConnected ? (
                <button
                  onClick={disconnect}
                  className="w-full py-3 text-sm font-semibold border-2 border-orange text-orange rounded-xl"
                >
                  {address}
                </button>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); setModalOpen(true); }}
                  className="w-full py-3 text-sm font-semibold border-2 border-white text-white rounded-xl hover:bg-orange hover:border-orange transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wallet selection modal */}
      <WalletModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
        isConnecting={isConnecting}
        connectingId={connectingId}
      />
    </>
  );
}
