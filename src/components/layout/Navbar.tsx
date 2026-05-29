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
  { label: "Wallet Profile", href: "/wallet/0xA91FC22B83D91F4C22B" },
];

export function Navbar() {
  const { address, isConnected, isConnecting, connectingId, connect, disconnect } =
    useWallet();

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

            {/* Center links - desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm text-[#888480] hover:text-white rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right - Faucet + Wallet */}
            <div className="hidden md:flex items-center gap-2">
              {/* Faucet */}
              <motion.a
                href={FAUCET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#888480] hover:text-white rounded-lg transition-all"
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.95 }}
              >
                <Droplets className="w-3.5 h-3.5" />
                Get Test GEN
              </motion.a>

              {/* Connect Wallet button */}
              <motion.button
                onClick={() => {
                  if (isConnected) {
                    disconnect();
                  } else {
                    setModalOpen(true);
                  }
                }}
                disabled={isConnecting}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-orange text-white transition-all disabled:opacity-60"
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.95 }}
              >
                {isConnecting
                  ? "Connecting..."
                  : isConnected
                    ? address
                    : "Connect Wallet"}
              </motion.button>
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
            className="fixed top-16 left-0 right-0 z-40 bg-[#0C0C0C]/98 backdrop-blur-md border-b border-[#1E1A18] md:hidden"
          >
            <div className="flex flex-col gap-1 mb-4 px-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-[#888480] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-[#1E1A18] px-4 pb-4">
              <a
                href={FAUCET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-[#888480] hover:text-white transition-all"
              >
                <Droplets className="w-4 h-4" />
                Get Test GEN
              </a>

              {isConnected ? (
                <button
                  onClick={disconnect}
                  className="w-full py-3 text-sm font-semibold border-2 border-orange text-orange rounded-xl transition-all"
                >
                  {address}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full py-3 text-sm font-semibold border-2 border-white text-white rounded-xl transition-all"
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
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
        isConnecting={isConnecting}
        connectingId={connectingId}
      />
    </>
  );
}