"use client";

import { GET_JADE_WHEEL_TOTAL_BETS } from "@/src/utils/queries";
import React from "react";
import { useQuery } from "@apollo/client";
import { formatEther } from "viem";
import StatsTable from "@/src/components/common/StatsTable";

const AnalyticsVolumeJadeInWheel: React.FC = () => {
  const { data, loading, error } = useQuery(GET_JADE_WHEEL_TOTAL_BETS, {
    // variables: {
    //   owner: address?.toLowerCase(),
    // },
  });

  const jadeWheelTotalBets: any[] = data?.jadeWheelTotalBets || [];

  const updatedJadeWheelTotalBets = jadeWheelTotalBets.map((i) => ({
    ...i,
    stat: (+formatEther(i.totalBetAmount)).toFixed(2),
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="h-screen content__box">
      <div className="h-full p-12 start-screen">
        <StatsTable
          statsLabel="Total Jade Volume"
          statsInfo={updatedJadeWheelTotalBets}
        />
      </div>
    </div>
  );
};

export default AnalyticsVolumeJadeInWheel;
