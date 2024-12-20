"use client";

import {
  GET_JADE_WHEEL_TOTAL_BETS,
  GET_PVPOINT,
  GET_TOTAL_BETS,
} from "@/src/utils/queries";
import React from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { formatEther } from "viem";
import StatsTable from "@/src/components/common/StatsTable";

const AnalyticsPlayerPVPoint: React.FC = () => {
  const { address } = useAccount();

  const { data, loading, error } = useQuery(GET_PVPOINT, {
    // variables: {
    //   owner: address?.toLowerCase(),
    // },
  });

  const totalBets: any[] = data?.pointsUpdateds || [];

  const updatedTotalBets = totalBets.map((i) => ({
    player: i.player,
    stat: (+formatEther(i.PVPoint)).toFixed(2),
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="h-screen content__box">
      <div className="h-full p-12 start-screen">
        <StatsTable statsLabel="PVPoint" statsInfo={updatedTotalBets} />
      </div>
    </div>
  );
};

export default AnalyticsPlayerPVPoint;
