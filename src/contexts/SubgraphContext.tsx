// context/SubgraphContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_AFFILIATE_POINTS_CLAIMS } from "../utils/queries";
// import { GET_AFFILIATE_POINTS_CLAIMS } from "../utils/queries";

interface AffiliatePointsClaim {
  id: string;
  referrer: string;
  player: string;
  RPointAmount: string;
  timestamp: string;
}

interface SubgraphContextType {
  claims: AffiliatePointsClaim[] | null;
  loading: boolean;
  error: any;
}

const SubgraphContext = createContext<SubgraphContextType | undefined>(
  undefined
);

export const SubgraphProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error } = useQuery(GET_AFFILIATE_POINTS_CLAIMS);

  const claims = data?.affiliatePointsClaims || null;

  return (
    <SubgraphContext.Provider value={{ claims, loading, error }}>
      {children}
    </SubgraphContext.Provider>
  );
};

export const useSubgraph = (): SubgraphContextType => {
  const context = useContext(SubgraphContext);
  if (!context) {
    throw new Error("useSubgraph must be used within a SubgraphProvider");
  }
  return context;
};

export const summarizeByReferrerAndDay = (events: any) => {
  return events.reduce((acc: any, event: any) => {
    const referrer = event.referrer;
    const date = new Date(Number(event.timestamp) * 1000)
      .toISOString()
      .split("T")[0]; // Convert timestamp to YYYY-MM-DD
    const RPointAmount = BigInt(event.RPointAmount);

    // Initialize data structures if not present
    if (!acc[referrer]) acc[referrer] = {};
    if (!acc[referrer][date]) acc[referrer][date] = BigInt(0);

    // Accumulate RPointAmount
    acc[referrer][date] += RPointAmount;

    return acc;
  }, {});
};

const summarizeByReferrerAndPlayer = (events: any) => {
  return events.reduce((acc: any, event: any) => {
    const referrer = event.referrer;
    const player = event.player;
    const RPointAmount = BigInt(event.RPointAmount);

    // Initialize data structures if not present
    if (!acc[referrer]) acc[referrer] = {};
    if (!acc[referrer][player]) acc[referrer][player] = BigInt(0);

    // Accumulate RPointAmount
    acc[referrer][player] += RPointAmount;

    return acc;
  }, {});
};
