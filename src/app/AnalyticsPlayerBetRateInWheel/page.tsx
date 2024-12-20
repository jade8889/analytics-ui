"use client";

import {
  GET_JADE_WHEEL_BET_RATE,
  GET_JADE_WHEEL_TOTAL_BETS,
  GET_PVPOINT,
  GET_TOTAL_BETS,
} from "@/src/utils/queries";
import React from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { formatEther } from "viem";
import StatsTable from "@/src/components/common/StatsTable";
import { convertTimestampToDate } from "@/src/utils";

const AnalyticsPlayerBetRateInWheel: React.FC = () => {
  const { address } = useAccount();

  const { data, loading, error } = useQuery(GET_JADE_WHEEL_BET_RATE, {
    // variables: {
    //   owner: address?.toLowerCase(),
    // },
  });
  // betAmount
  // maxBets
  // betRate
  // timestamp

  const totalBets: any[] = data?.jadeWheelBetRates || [];

  const updatedTotalBets = totalBets.map((i) => ({
    player: i.player,
    stat: [
      (+formatEther(i.betAmount)).toFixed(2),
      (+formatEther(i.maxBets)).toFixed(2),
      +formatEther(i.betRate),
      convertTimestampToDate(i.timestamp),
    ],
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="h-screen content__box">
      <div className="h-full p-12 start-screen">
        <StatsTable
          statsLabel={["Bet Amount", "Max Bets", "Bet Rate", "Bet Time"]}
          statsInfo={updatedTotalBets}
        />
      </div>
    </div>
  );
};

export default AnalyticsPlayerBetRateInWheel;
