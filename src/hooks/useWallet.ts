"use client";

import { useCallback, useMemo, useState } from "react";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<any>;
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isRabby?: boolean;
  isPhantom?: boolean;
  providers?: EthereumProvider[];
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    phantom?: {
      ethereum?: EthereumProvider;
    };
  }
}

const GENLAYER_CHAIN = {
  chainId: "0x107D", // 4221
  chainName: "GenLayer Testnet",
  nativeCurrency: {
    name: "GEN",
    symbol: "GEN",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.testnet-chain.genlayer.com"],
  blockExplorerUrls: [],
};

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getInjectedProvider(walletId: string): EthereumProvider | null {
  if (typeof window === "undefined") return null;

  const ethereum = window.ethereum;
  const providers = ethereum?.providers || [];

  if (walletId === "metamask") {
    return providers.find((p) => p.isMetaMask) || (ethereum?.isMetaMask ? ethereum : null);
  }

  if (walletId === "coinbase") {
    return providers.find((p) => p.isCoinbaseWallet) || (ethereum?.isCoinbaseWallet ? ethereum : null);
  }

  if (walletId === "rabby") {
    return providers.find((p) => p.isRabby) || (ethereum?.isRabby ? ethereum : null);
  }

  if (walletId === "phantom") {
    return window.phantom?.ethereum || providers.find((p) => p.isPhantom) || (ethereum?.isPhantom ? ethereum : null);
  }

  return ethereum || null;
}

async function addOrSwitchToGenLayer(provider: EthereumProvider) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: GENLAYER_CHAIN.chainId }],
    });
  } catch (switchError: any) {
    if (switchError?.code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [GENLAYER_CHAIN],
      });
    } else {
      throw switchError;
    }
  }
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const wallets = useMemo(() => {
    if (typeof window === "undefined") {
      return [
        { id: "metamask", name: "MetaMask", installed: false },
        { id: "phantom", name: "Phantom", installed: false },
        { id: "rabby", name: "Rabby", installed: false },
        { id: "coinbase", name: "Coinbase Wallet", installed: false },
      ];
    }

    return [
      {
        id: "metamask",
        name: "MetaMask",
        installed: !!getInjectedProvider("metamask"),
      },
      {
        id: "phantom",
        name: "Phantom",
        installed: !!getInjectedProvider("phantom"),
      },
      {
        id: "rabby",
        name: "Rabby",
        installed: !!getInjectedProvider("rabby"),
      },
      {
        id: "coinbase",
        name: "Coinbase Wallet",
        installed: !!getInjectedProvider("coinbase"),
      },
    ];
  }, []);

  const connect = useCallback(async (walletId: string, name: string) => {
    try {
      setIsConnecting(true);
      setConnectingId(walletId);

      const provider = getInjectedProvider(walletId);

      if (!provider) {
        alert(`${name} is not installed on this browser.`);
        return;
      }

      await addOrSwitchToGenLayer(provider);

      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      const connectedAddress = accounts?.[0];

      if (!connectedAddress) {
        throw new Error("No wallet address returned");
      }

      setAddress(shortenAddress(connectedAddress));
      setWalletName(name);
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Wallet connection failed. Please try again.");
    } finally {
      setIsConnecting(false);
      setConnectingId(null);
    }
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
    wallets,
    connect,
    disconnect,
  };
}