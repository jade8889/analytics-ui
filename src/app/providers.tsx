"use client";

import * as React from "react";

import { defineChain } from "viem";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const base = defineChain({
  id: 8453,
  network: "base",
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://base-rpc.publicnode.com"],
      // http: ["https://base.blockpi.network/v1/rpc/public"],
    },
    public: {
      http: ["https://base-rpc.publicnode.com"],
      // http: ["https://base.blockpi.network/v1/rpc/public"],
    },
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
    },
    etherscan: {
      name: "Basescan",
      url: "https://basescan.org",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022,
    },
  },
});

const baseSepolia = defineChain({
  id: 84532,
  network: "base sepolia",
  name: "Base Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      // http: ["https://base-sepolia-rpc.publicnode.com"],
      // http: ["https://go.getblock.io/4b4468b967cd4df4a39755b71afd5aee"],
      http: ["https://sepolia.base.org"],
    },
    public: {
      // http: ["https://base-sepolia-rpc.publicnode.com"],
      http: ["https://sepolia.base.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Basescan Sepolia",
      url: "https://sepolia.basescan.org/",
    },
    etherscan: {
      name: "Basescan Sepolia",
      url: "https://sepolia.basescan.org/",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1059647,
    },
  },
});

export const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/49805/jade/version/latest", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return <ApolloProvider client={client}>{mounted && children}</ApolloProvider>;
}
