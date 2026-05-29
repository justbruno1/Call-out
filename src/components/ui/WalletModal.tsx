"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Wallet = {
  id: string;
  name: string;
  installed: boolean;
};

type WalletModalProps = {
  open: boolean;
  onClose: () => void;
  onConnect: (walletId: string, walletName: string) => void;
  isConnecting: boolean;
  connectingId: string | null;
  wallets?: Wallet[];
};

const walletLogos: Record<string, string> = {
  metamask:
    "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  phantom:
    "https://avatars.githubusercontent.com/u/78782331?s=200&v=4",
  rabby:
    "https://rabby.io/assets/images/logo-128.png",
  coinbase:
    "https://avatars.githubusercontent.com/u/18060234?s=200&v=4",
};

const defaultWallets: Wallet[] = [
  { id: "metamask", name: "MetaMask", installed: true },
  { id: "phantom", name: "Phantom", installed: false },
  { id: "rabby", name: "Rabby", installed: true },
  { id: "coinbase", name: "Coinbase Wallet", installed: false },
];

function WalletLogo({ id, name }: { id: string; name: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
      <img
        src={walletLogos[id]}
        alt={`${name} logo`}
        className="h-7 w-7 object-contain"
      />
    </div>
  );
}

export function WalletModal({
  open,
  onClose,
  onConnect,
  isConnecting,
  connectingId,
  wallets = defaultWallets,
}: WalletModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-[430px] overflow-hidden rounded-2xl bg-white text-[#171717] shadow-2xl"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-xl font-black tracking-[-0.04em]">
                Connect Wallet
              </h2>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="Close wallet modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 px-6 pb-5">
              {wallets.map((wallet) => {
                const disabled = !wallet.installed || isConnecting;
                const loading = connectingId === wallet.id;

                return (
                  <button
                    key={wallet.id}
                    disabled={disabled}
                    onClick={() => onConnect(wallet.id, wallet.name)}
                    className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 text-left transition hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <div className="flex items-center gap-4">
                      <WalletLogo id={wallet.id} name={wallet.name} />

                      <p className="text-base font-bold text-neutral-900">
                        {wallet.name}
                      </p>
                    </div>

                    <div className="text-sm text-neutral-400">
                      {loading ? (
                        <span>Connecting...</span>
                      ) : wallet.installed ? (
                        <span className="text-lg">›</span>
                      ) : (
                        <span>Not installed</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-neutral-100 px-6 py-5 text-center">
              <button className="text-sm font-semibold text-neutral-700 transition hover:text-orange">
                I don&apos;t have a wallet
              </button>

              <p className="mx-auto mt-5 max-w-[320px] text-sm leading-6 text-neutral-400">
                By connecting your wallet you agree to the{" "}
                <a href="#" className="font-semibold text-orange">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-orange">
                  Privacy Policy
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}