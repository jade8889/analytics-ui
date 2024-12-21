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
import { useSubgraph } from "@/src/contexts/SubgraphContext";

const AnalyticsPlayerTotalEV: React.FC = () => {
  const { TotalBets } = useSubgraph();
  // const { data, loading, error } = useQuery(GET_EV_GENERATED, {
  // });

  // const totalEV: any[] = data?.evgenerateds || [];

  // const summary = totalEV.reduce((acc: any, item: any) => {
  //   const player = item.player;

  //   if (!acc[player]) {
  //     acc[player] = {
  //       totalEVGenerated: BigInt(0),
  //       totalRNGFeeForTax: BigInt(0),
  //       totalRngCost: BigInt(0),
  //     };
  //   }

  //   acc[player].totalEVGenerated += BigInt(item.EVGenerated);
  //   acc[player].totalRNGFeeForTax += BigInt(item.currentRNGFeeForTax);
  //   acc[player].totalRngCost += BigInt(item.rngCost);

  //   return acc;
  // }, {});

  // const summaryResult = Object.entries(summary).map(([player, totals]) => ({
  //   player,
  //   totalEVGenerated: totals.totalEVGenerated.toString(),
  //   totalRNGFeeForTax: totals.totalRNGFeeForTax.toString(),
  //   totalRngCost: totals.totalRngCost.toString(),
  // }));

  // const updatedTotalBets = summaryResult.map((i) => ({
  //   player: i.player,
  //   stat: [
  //     +formatEther(i.totalEVGenerated),
  //     +formatEther(i.totalRNGFeeForTax),
  //     +formatEther(i.totalRngCost),
  //   ],
  // }));

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <StatsTable
      title={"Total EV Overall"}
      statsLabel={[
        "EV Generated ( ETH )",
        "RNG Fee for tax ( ETH )",
        "RNG Cost ( ETH )",
      ]}
      statsInfo={TotalBets}
    />
  );
};

export default AnalyticsPlayerTotalEV;
