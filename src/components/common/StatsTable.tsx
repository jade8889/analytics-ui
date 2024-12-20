import React from "react";

interface StatsTableProps {
  statsLabel: string | string[];
  statsInfo: { player: string; stat: any }[];
  unit?: string;
}

const StatsTable: React.FC<StatsTableProps> = ({
  statsLabel,
  statsInfo,
  unit,
}) => {
  return (
    <div className="col-span-2 p-6 bg-[#194535] shadow-lg rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-bold text-white uppercase">
          Volume Jade in Wheel
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-white border border-collapse border-gray-700 table-auto">
          <thead>
            <tr className="bg-[#123222] text-left">
              <th className="px-4 py-2 border border-gray-700">Address</th>
              <th className="px-4 py-2 border border-gray-700">Rank</th>
              {Array.isArray(statsLabel) ? (
                statsLabel.map((label: string, index: number) => (
                  <th key={index} className="px-4 py-2 border border-gray-700">
                    {label}
                  </th>
                ))
              ) : (
                <th className="px-4 py-2 border border-gray-700">
                  {statsLabel}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {statsInfo.map((entry: any, index: any) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#16412B]" : "bg-[#123222]"
                } hover:bg-[#1C5B39] transition-all`}
              >
                <td className="px-4 py-2 border border-gray-700">
                  {entry.player}
                </td>
                <td className="px-4 py-2 border border-gray-700">
                  {index + 1}
                </td>
                {Array.isArray(statsLabel) ? (
                  statsLabel.map((_, statIndex) => (
                    <td
                      key={statIndex}
                      className="px-4 py-2 border border-gray-700"
                    >
                      {entry.stat[statIndex]} {unit}
                    </td>
                  ))
                ) : (
                  <td className="px-4 py-2 border border-gray-700">
                    {entry.stat || "-"} {unit}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTable;
