// context/SubgraphContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_AFFILIATE_POINTS_CLAIMS,
  GET_EV_GENERATED,
} from "../utils/queries";
import { formatEther } from "viem";
// import { GET_AFFILIATE_POINTS_CLAIMS } from "../utils/queries";

interface AffiliatePointsClaim {
  id: string;
  referrer: string;
  player: string;
  RPointAmount: string;
  timestamp: string;
}

interface SubgraphContextType {
  TotalBets: {
    player: string;
    stat: number[];
  }[];
}

const SubgraphContext = createContext<SubgraphContextType | undefined>(
  undefined
);

export const SubgraphProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Calculate EV generated
  const { data, loading, error } = useQuery(GET_EV_GENERATED, {});

  const totalEV: any[] = data?.evgenerateds || [];

  const summary = totalEV.reduce((acc: any, item: any) => {
    const player = item.player;

    if (!acc[player]) {
      acc[player] = {
        totalEVGenerated: BigInt(0),
        totalRNGFeeForTax: BigInt(0),
        totalRngCost: BigInt(0),
      };
    }

    acc[player].totalEVGenerated += BigInt(item.EVGenerated);
    acc[player].totalRNGFeeForTax += BigInt(item.currentRNGFeeForTax);
    acc[player].totalRngCost += BigInt(item.rngCost);

    return acc;
  }, {});

  const summaryResult = Object.entries(summary).map(([player, totals]) => ({
    player,
    totalEVGenerated: (totals as any).totalEVGenerated.toString(),
    totalRNGFeeForTax: (totals as any).totalRNGFeeForTax.toString(),
    totalRngCost: (totals as any).totalRngCost.toString(),
  }));

  const TotalBets = summaryResult.map((i) => ({
    player: i.player,
    stat: [
      +formatEther(i.totalEVGenerated),
      +formatEther(i.totalRNGFeeForTax),
      +formatEther(i.totalRngCost),
    ],
  }));

  return (
    <SubgraphContext.Provider value={{ TotalBets }}>
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
