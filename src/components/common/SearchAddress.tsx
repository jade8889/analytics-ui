"use client";

import { client } from "@/src/app/providers";
import { useSubgraph } from "@/src/contexts/SubgraphContext";
import { GET_BET_RATE, GET_USER_INFO } from "@/src/utils/queries";
import React, { useState } from "react";
import { formatEther, isAddress } from "viem";
import StatsTable from "./StatsTable";

const SearchAddress: React.FC = () => {
  const { TotalBets } = useSubgraph();

  const [address, setAddress] = useState("");

  const [volumeStats, setVolumeStats] = useState<
    {
      player: string;
      stat: any[];
    }[]
  >([]);

  const [playerStats, setPlayerStats] = useState<
    {
      player: string;
      stat: any[];
    }[]
  >([]);

  const tabs = ["Volume", "Player Value"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const volume_categories = [
    "Jade Bet Volume",
    "Total Bet Count",
    "Total Bet Volume",
    // "xJade Bet Volume",
  ];

  const player_categories = ["PVPoint", "Total EV"];

  const handleSearch = async () => {
    if (!address && !isAddress(address)) return;
    const includesAddress = volumeStats.some(
      (stat) => stat.player.toLowerCase() === address.toLowerCase()
    );
    if (includesAddress) return;

    const { data } = await client.query({
      query: GET_USER_INFO,
      variables: { player: address },
    });
    console.log("result", data);

    const fetchedVolumeStats = {
      player: address,
      stat: [
        // jadeBetVolume:
        (+formatEther(data.jadeWheelTotalBets[0].totalBetAmount)).toFixed(2) +
          "Jade",
        //totalBetCount:
        data.pointsUpdateds[0].totalBetCount,
        //totalBetVolume:
        (+formatEther(data.pointsUpdateds[0].totalBetVolume)).toFixed(2) +
          "ETH",
      ],
    };

    const fetchedPlayerStats = {
      player: address,
      stat: [
        // PVPoint:
        (+formatEther(data.pointsUpdateds[0].PVPoint)).toFixed(2),
        // totalEV:
        TotalBets.find((i) => i.player.toLowerCase() == address.toLowerCase())
          ?.stat[0],
      ],
    };

    setVolumeStats((prevStats: any[]) => [...prevStats, fetchedVolumeStats]);

    setPlayerStats((prevStats: any[]) => [...prevStats, fetchedPlayerStats]);

    // PlayerValue: {
    //   PVPoint: (+formatEther(data.pointsUpdateds[0].PVPoint)).toFixed(2),
    //   totalEV: TotalBets.find(
    //     (i) => i.player.toLowerCase() == address.toLowerCase()
    //   )?.stat[0],
    // },
  };

  return (
    <div className="p-6 bg-[#194535] mb-5 shadow-lg rounded-xl">
      <div className="flex flex-col items-center gap-2 mb-6">
        <span className="text-lg font-bold text-white uppercase">
          Enter Address
        </span>
        <div className="flex items-center justify-between w-full p-2.5 bg-gray-100 rounded-lg mb-4">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-2/3 text-lg text-gray-800 bg-transparent outline-none"
            placeholder="0x....."
          />
          <button
            className="px-4 py-2 text-lg font-bold text-white bg-green-900 rounded-md hover:bg-green-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex w-full mb-4 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
            className={`flex-1 py-3 font-bold text-center rounded-t-lg cursor-pointer  ${
              activeTab === tab ? "text-grey bg-green-800" : "text-white"
            } hover:bg-green-500 hover:text-grey`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab == "Volume" ? (
        <StatsTable
          title={"Volume"}
          statsLabel={volume_categories}
          statsInfo={volumeStats}
          rank={false}
        />
      ) : (
        <StatsTable
          title={"Value"}
          statsLabel={player_categories}
          statsInfo={playerStats}
          rank={false}
        />
      )}
    </div>
  );
};

export default SearchAddress;
