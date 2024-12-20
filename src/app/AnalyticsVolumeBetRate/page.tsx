"use client";

import {
  GET_BET_RATE,
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

const AnalyticsVolumeBetRate: React.FC = () => {
  const { data, loading, error } = useQuery(GET_BET_RATE, {
    // variables: {
    //   owner: address?.toLowerCase(),
    // },
  });
  // betAmount
  // maxBets
  // betRate
  // timestamp

  const totalBets: any[] = data?.pointsUpdateds || [];

  const updatedTotalBets = totalBets.map((i) => ({
    player: i.player,
    stat: [
      (+formatEther(i.totalBetVolume)).toFixed(2),
      (+formatEther(i.xJadeBetVolume)).toFixed(2),
      +formatEther(i.jadeWheelBetVolume),
    ],
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <StatsTable
      title="Volume Bets Rate"
      statsLabel={[
        "Total Bet Volume",
        "xJade Bet Volume",
        "Jade Wheel Bet Volume",
      ]}
      statsInfo={updatedTotalBets}
      unit="ETH"
    />
  );
};

export default AnalyticsVolumeBetRate;
