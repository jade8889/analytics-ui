"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const onScroll = () => {
    const { scrollY } = window;
    const head = document.getElementById("header");

    if (scrollY > 10 && head) {
      head.classList.add("black");
    } else if (scrollY <= 10 && head) {
      head.classList.remove("black");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="flex z-[999] relative bg-[#131E1A] justify-between content-center h-28 h-auto sticky top-0">
        <div className="flex items-center content-center gap-4 p-4 max-md:hidden">
          {!open ? (
            <div
              className="bg-[url(/img/navigation/mobile-navi.svg)] h-12 w-24 bg-no-repeat bg-center block xl:hidden"
              onClick={() => setOpen(true)}
            ></div>
          ) : (
            <div
              className="bg-[url(/img/navigation/mobile-close.svg)] h-12 w-24 bg-no-repeat bg-center block xl:hidden"
              onClick={() => setOpen(false)}
            ></div>
          )}
        </div>
        <div className="items-center content-center block gap-4 p-4 md:hidden">
          {!open ? (
            <div
              className="bg-[url(/img/navigation/mobile-navi.svg)] h-12 w-24 bg-no-repeat bg-center block xl:hidden"
              onClick={() => setOpen(true)}
            ></div>
          ) : (
            <div
              className="bg-[url(/img/navigation/mobile-close.svg)] h-12 w-24 bg-no-repeat bg-center block xl:hidden"
              onClick={() => setOpen(false)}
            ></div>
          )}
        </div>
      </div>

      {open && <div className="bg_overlay animate-fade-in"></div>}
      <div className={`navigation__box ${open ? "open" : ""}`}>
        <div className="top">
          <div className="navi">
            <div className="ttl">Volume</div>
            <ul>
              <li>
                {/* <a */}
                <Link
                  href="AnalyticsVolumeXJade"
                  onClick={() => setOpen(false)}
                  className="a_with_icon"
                >
                  xJade Bet Volume per player
                  {/* </a> */}
                </Link>
              </li>
              <li>
                {/* <a */}
                <Link
                  href="AnalyticsVolumeJadeInWheel"
                  onClick={() => setOpen(false)}
                  className="a_with_icon"
                >
                  Jade Bet Volume per player in Wheel
                  {/* </a> */}
                </Link>
              </li>
              <li>
                <Link
                  href="AnalyticsVolumeTotalBetsCount"
                  onClick={() => setOpen(false)}
                  className="a_with_icon"
                >
                  Total Bets made per player
                </Link>
              </li>
              <li>
                <Link
                  href="AnalyticsVolumeBetRate"
                  onClick={() => setOpen(false)}
                  className="a_with_icon"
                >
                  Volume bets rate
                </Link>
              </li>
            </ul>
          </div>

          <div className="navi mb-30">
            <div className="ttl">xJade</div>
            <ul>
              <li>
                <Link
                  href="AnalyticsXJadeBonusAvgBet"
                  // onClick={() => setIsRedeemModalOpen(true)}
                  className="a_with_icon"
                >
                  xJade Bonus Avg Bet size
                </Link>
              </li>
              <li>
                <Link
                  href="AnalyticsXJadeSizeOfXjadeBonus"
                  // onClick={() => setIsRedeemModalOpen(true)}
                  className="a_with_icon"
                >
                  size of xJade bonus claimed in Avg
                </Link>
              </li>
            </ul>
          </div>

          <div className="navi mb-30">
            <div className="ttl">Player Value</div>
            <ul>
              <li>
                <Link
                  href="AnalyticsPlayerPVPoint"
                  // onClick={() => setIsRedeemModalOpen(true)}
                  className="a_with_icon"
                >
                  PVPoints
                </Link>
              </li>
              <li>
                <Link
                  href="AnalyticsPlayerBetRateInWheel"
                  // onClick={() => setIsRedeemModalOpen(true)}
                  className="a_with_icon"
                >
                  Jade bet Rate with max bet in Wheel
                </Link>
              </li>
              <li>
                <Link
                  href="AnalyticsPlayerTotalEV"
                  // onClick={() => setIsRedeemModalOpen(true)}
                  className="a_with_icon"
                >
                  Total EV Overall
                </Link>
              </li>
              <li>
                <Link
                  href="AnalyticsPlayerEVInGame"
                  // onClick={() => setIsRedeemModalOpen(true)}
                  className="a_with_icon"
                >
                  Total EV in each games
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
