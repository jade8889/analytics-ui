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

const AnalyticsPlayerTotalEV: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EV_GENERATED, {
    // variables: {
    //   owner: address?.toLowerCase(),
    // },
  });

  const totalBets: any[] = data?.evgenerateds || [];

  const updatedTotalBets = totalBets.map((i) => ({
    player: i.player,
    stat: [
      +formatEther(i.EVGenerated),
      +formatEther(i.currentRNGFeeForTax),
      i.currentTaxRate,
      +formatEther(i.rngCost),
    ],
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="h-screen content__box">
      <div className="h-full p-12 start-screen">
        <StatsTable
          statsLabel={[
            "EV Generated",
            "RNG Fee for tax",
            "Tax Rate",
            "RNG Cost",
          ]}
          statsInfo={updatedTotalBets}
        />
      </div>
    </div>
  );
};

export default AnalyticsPlayerTotalEV;
