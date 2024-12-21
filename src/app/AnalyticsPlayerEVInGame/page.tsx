"use client";

import {
  GET_EV_GENERATED,
  GET_JADE_WHEEL_BET_RATE,
  GET_JADE_WHEEL_TOTAL_BETS,
  GET_PVPOINT,
  GET_TOTAL_BETS,
} from "@/src/utils/queries";
import React from "react";
import { useQuery } from "@apollo/client";
import { formatEther } from "viem";
import StatsTable from "@/src/components/common/StatsTable";
import { convertTimestampToDate } from "@/src/utils";

const AnalyticsPlayerEVInGame: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EV_GENERATED, {
    // variables: {
    //   owner: address?.toLowerCase(),
    // },
  });

  const totalBets: any[] = data?.evgenerateds || [];

  const summary = totalBets.reduce((acc: any, item: any) => {
    const player = item.player;

    if (!acc[player]) {
      acc[player] = {
        wheelEV: BigInt(0),
        plinkoEV: BigInt(0),
        catEV: BigInt(0),
      };
    }

    if (item.gameType == 0) acc[player].wheelEV += BigInt(item.EVGenerated);
    if (item.gameType == 1) acc[player].plinkoEV += BigInt(item.EVGenerated);
    if (item.gameType == 2) acc[player].catEV += BigInt(item.EVGenerated);

    return acc;
  }, {});

  const summaryResult = Object.entries(summary).map(([player, totals]) => ({
    player,
    wheelEV: (totals as any).wheelEV.toString(),
    plinkoEV: (totals as any).plinkoEV.toString(),
    catEV: (totals as any).catEV.toString(),
  }));

  const updatedTotalBets = summaryResult.map((i) => ({
    player: i.player,
    stat: [
      +formatEther(i.wheelEV),
      +formatEther(i.plinkoEV),
      +formatEther(i.catEV),
    ],
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <StatsTable
      title="Total EV in each game"
      statsLabel={["Jade Wheel EV", "Plinko EV", "Cat EV"]}
      statsInfo={updatedTotalBets}
    />
  );
};

export default AnalyticsPlayerEVInGame;
