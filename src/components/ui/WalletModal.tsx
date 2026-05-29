"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface WalletOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const wallets: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect using your MetaMask browser extension",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="40" height="40" rx="8" fill="#F6851B" />
        <path d="M30.5 8L21.7 14.4l1.6-3.8L30.5 8z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 8l8.7 6.5-1.5-3.9L9.5 8zM27.6 25.7l-2.3 3.6 5 1.4 1.4-4.9-4.1-.1zM7.7 25.8l1.4 4.9 5-1.4-2.3-3.6-4.1.1z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.8 18.8l-1.4 2.1 4.9.2-.2-5.3-3.3 3zM26.2 18.8l-3.4-3.1-.1 5.4 4.9-.2-1.4-2.1zM13.7 29.3l3-1.4-2.6-2-.4 3.4zM23.3 27.9l2.9 1.4-.3-3.4-2.6 2z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26.2 29.3l-2.9-1.4.2 1.9v.9l2.7-1.4zM13.7 29.3l2.8 1.4v-.9l.2-1.9-3 1.4z" fill="#D3501B" stroke="#D3501B" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Scan with your mobile wallet to connect",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="40" height="40" rx="8" fill="#3B99FC" />
        <path d="M12.8 16.2c4-3.9 10.4-3.9 14.4 0l.5.5c.2.2.2.5 0 .7l-1.7 1.6c-.1.1-.3.1-.4 0l-.7-.6c-2.8-2.7-7.2-2.7-10 0l-.7.7c-.1.1-.3.1-.4 0l-1.7-1.6c-.2-.2-.2-.5 0-.7l.7-.6zm17.8 3.3l1.5 1.4c.2.2.2.5 0 .7l-6.7 6.5c-.2.2-.5.2-.7 0l-4.7-4.6c-.1-.1-.2-.1-.3 0l-4.7 4.6c-.2.2-.5.2-.7 0L8.1 21.7c-.2-.2-.2-.5 0-.7l1.5-1.4c.2-.2.5-.2.7 0l4.7 4.6c.1.1.2.1.3 0l4.7-4.6c.2-.2.5-.2.7 0l4.7 4.6c.1.1.2.1.3 0l4.7-4.6c.2-.1.5-.1.7.1z" fill="white" />
      </svg>
    ),
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect with Coinbase Wallet extension or app",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="40" height="40" rx="8" fill="#1652F0" />
        <path d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12 12-5.4 12-12S26.6 8 20 8zm0 4.5c4.1 0 7.5 3.4 7.5 7.5s-3.4 7.5-7.5 7.5-7.5-3.4-7.5-7.5 3.4-7.5 7.5-7.5zm-3 5.5v4h6v-4h-6z" fill="white" />
      </svg>
    ),
  },
  {
    id: "rainbow",
    name: "Rainbow",
    description: "The fun and simple Ethereum wallet",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="40" height="40" rx="8" fill="url(#rainbow)" />
        <defs>
          <linearGradient id="rainbow" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="25%" stopColor="#FFD93D" />
            <stop offset="50%" stopColor="#6BCB77" />
            <stop offset="75%" stopColor="#4D96FF" />
            <stop offset="100%" stopColor="#C77DFF" />
          </linearGradient>
        </defs>
        <path d="M20 26c-4.4 0-8-3.6-8-8h3c0 2.8 2.2 5 5 5s5-2.2 5-5h3c0 4.4-3.6 8-8 8zm0-4c-2.2 0-4-1.8-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.2-1.8 4-4 4zm0-4c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="white" />
      </svg>
    ),
  },
  {
    id: "trust",
    name: "Trust Wallet",
    description: "Simple and secure crypto wallet",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="40" height="40" rx="8" fill="#0500FF" />
        <path d="M20 8l-10 4.5v8C10 26.3 14.3 31.4 20 33c5.7-1.6 10-6.7 10-12.5v-8L20 8zm0 3.2l7 3.2v6.1c0 4.2-3 7.9-7 9.2-4-1.3-7-5-7-9.2v-6.1l7-3.2z" fill="white" />
      </svg>
    ),
  },
];

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string, walletName: string) => void;
  isConnecting: boolean;
  connectingId: string | null;
}

export function WalletModal({ isOpen, onClose, onConnect, isConnecting, connectingId }: WalletModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#111111] border border-[#252222] rounded-2xl w-full max-w-sm shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1A18]">
                <div>
                  <h2 className="font-heading font-bold text-white text-lg">Connect Wallet</h2>
                  <p className="text-xs text-[#555050] mt-0.5">Choose an EVM-compatible wallet</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#555050] hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 0.96 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Wallet list */}
              <div className="p-3">
                {wallets.map((wallet) => {
                  const isThisConnecting = isConnecting && connectingId === wallet.id;
                  return (
                    <motion.button
                      key={wallet.id}
                      onClick={() => !isConnecting && onConnect(wallet.id, wallet.name)}
                      disabled={isConnecting}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group text-left"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex-shrink-0">{wallet.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">{wallet.name}</p>
                        <p className="text-xs text-[#555050] mt-0.5 leading-relaxed">{wallet.description}</p>
                      </div>
                      {isThisConnecting ? (
                        <svg className="animate-spin h-4 w-4 text-orange flex-shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-[#333] group-hover:text-orange transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer note */}
              <div className="px-6 py-4 border-t border-[#1E1A18]">
                <p className="text-xs text-[#444040] text-center leading-relaxed">
                  By connecting a wallet you agree to Callout's{" "}
                  <a href="/terms" className="text-orange hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="/privacy" className="text-orange hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
