"use client";

import { GET_JADE_WHEEL_TOTAL_BETS, GET_TOTAL_BETS } from "@/src/utils/queries";
import React from "react";
import { useQuery } from "@apollo/client";
import { formatEther } from "viem";
import StatsTable from "@/src/components/common/StatsTable";

const AnalyticsVolumeTotalBetsCount: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TOTAL_BETS, {
    // variables: {
    //   owner: address?.toLowerCase(),
    // },
  });

  const totalBets: any[] = data?.pointsUpdateds || [];

  const updatedTotalBets = totalBets.map((i) => ({
    player: i.player,
    stat: i.totalBetCount,
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <StatsTable
      title={"Total Bets Count"}
      statsLabel="Total Bet Count"
      statsInfo={updatedTotalBets}
    />
  );
};

export default AnalyticsVolumeTotalBetsCount;
