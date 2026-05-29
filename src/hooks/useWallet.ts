"use client";
import { useState, useCallback } from "react";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const connect = useCallback(async (walletId: string, name: string) => {
    setIsConnecting(true);
    setConnectingId(walletId);
    // Simulated connection delay — replace with real wagmi/viem connect call
    await new Promise((r) => setTimeout(r, 1200));
    setAddress("0xA91F...C22B");
    setWalletName(name);
    setIsConnecting(false);
    setConnectingId(null);
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setWalletName(null);
  }, []);

  return {
    address,
    walletName,
    isConnected: !!address,
    isConnecting,
    connectingId,
    connect,
    disconnect,
  };
}
