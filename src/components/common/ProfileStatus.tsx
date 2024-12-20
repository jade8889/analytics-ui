"use client";
import { useState } from "react";
import Image from "next/image";
import { formatEther } from "viem";
import { convertSeconds } from "@/src/utils";
import useJadePointSystem from "@/src/hooks/PointSystem/useJadePointSystem";

export default function ProfileStatus() {
  const pointUserInfo = useJadePointSystem();

  const SPointValue =
    (pointUserInfo.userPointInfo.SPoint /
      pointUserInfo.nextVIPLevel.lowerBound /
      (pointUserInfo.nextVIPLevel.upperBound -
        pointUserInfo.nextVIPLevel.lowerBound)) *
    100;

  return (
    <div className="h-[60px]">
      <div className="relative w-[250px] h-[40px] bg-[#1e3b27] rounded-xl flex flex-col items-center shadow-lg">
        <div className="flex flex-col w-full">
          <div className="bg-[#246D52] rounded-t-md w-full py-1 px-2">
            {/* Progress Dots */}
            <div className="flex space-x-1">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${
                      index < Number(pointUserInfo.userVIPLevel)
                        ? "bg-[#FFB800]"
                        : "bg-gray-500"
                    }`}
                  />
                ))}
            </div>
          </div>
          {/* Badge Level and RTP */}
          <div className="flex items-center space-x-2 bg-[#173524] px-2 py-1 rounded-md">
            <span className="text-lg font-bold text-[#FFB800]">BRONZE</span>
            <span className="text-sm font-medium text-white">
              {pointUserInfo.nextVIPLevel.rtp[0] / 100}% RTP
            </span>
          </div>
        </div>

        <div className="absolute right-3 -bottom-4 w-[65px] h-[65px]">
          <Image
            src="/img/mascot/mascot_glass.png"
            alt="profile"
            fill
            objectFit="fit"
            className="ml-1 border-2 border-black border-solid rounded-full"
          />
        </div>

        {/* Flame Progress Bar */}
        <div className="relative w-full px-3 mt-2.5">
          <div className="relative h-3 bg-white rounded-lg">
            <div
              className="absolute h-full rounded-lg"
              style={{
                width: `${SPointValue}%`,
                background: "linear-gradient(to right, #ff0000, #ffffff)",
              }}
            />
            <div
              className="absolute w-6 h-6 bg-center bg-no-repeat bg-contain"
              style={{
                left: `${SPointValue}%`,
                transform: "translateX(-50%)",
                backgroundImage: 'url("/img/fire_icon.png")',
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center pt-2 bg-[#133024] w-[180px] h-[50px] rounded-b-2xl shadow-md">
          <div className="flex flex-col items-center text-center">
            {pointUserInfo.temporaryBoostInfo.multiplier == 0 ||
            pointUserInfo.temporaryBoostInfo.endTimestamp <
              Date.now() / 1000 ? (
              <span className="text-sm font-semibold text-[#C4F5C2]">
                NO BOOST
              </span>
            ) : (
              <>
                <span className="text-sm font-semibold text-[#C4F5C2]">
                  BOOST FINISH
                </span>
                <span className="text-lg font-bold text-white">
                  {convertSeconds(
                    pointUserInfo.temporaryBoostInfo.endTimestamp -
                      Date.now() / 1000
                  )}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
