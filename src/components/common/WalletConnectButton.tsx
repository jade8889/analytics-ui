"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import profile_default from "@/public/img/connect/profile-default.jpeg";
import useTokenBalance from "@/src/hooks/useTokenBalance";
import { chains } from "@/src/statics/helpers/chains";
import useChain from "@/src/hooks/useChain";
import { formatNumber } from "@/src/statics/helpers/numberFormatter";
import { BiHide } from "react-icons/bi";
import { useState } from "react";
import {
  LanguageType,
  useLanguageContext,
} from "@/src/contexts/LanguageContext";

import ProfileModal from "../profile/profileModal";
import useJadePointSystem from "@/src/hooks/PointSystem/useJadePointSystem";

export default function WalletConnectButton() {
  const chainId = useChain();

  const userBalance = useTokenBalance(
    chains[chainId].contracts.jadeToken.address
  );

  const [showBalance, setShowBalance] = useState(true);

  const lang = useLanguageContext();

  const [showVip, setShowVip] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const jadePointSystem = useJadePointSystem();

  const percentage = 0;

  // jadePointSystem &&
  //   console.log(
  //     "percentage",
  //     percentage,
  //     Number(jadePointSystem.vipPoints),
  //     Number(
  //       jadePointSystem.VIPLevels[Number(jadePointSystem.vipLevel)].lowerBound
  //     ),
  //     Number(
  //       jadePointSystem.VIPLevels[Number(jadePointSystem.vipLevel)].upperBound
  //     ),
  //     Number(
  //       jadePointSystem.VIPLevels[Number(jadePointSystem.vipLevel)].lowerBound
  //     )
  //   );

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <>
            <div
              className="w-56 h-full overflow-hidden !p-0"
              {...(!ready && {
                "aria-hidden": true,
              })}
            >
              <div className="w-full h-full p-1">
                {!connected && (
                  <button
                    className="w-full h-full bg-green-800 rounded-2xl"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect
                  </button>
                )}

                {chain && chain.unsupported && (
                  <button
                    className="w-full h-full bg-green-800 rounded-2xl"
                    onClick={openChainModal}
                    type="button"
                  >
                    Unsupported network
                  </button>
                )}

                {connected && !chain.unsupported && (
                  <div className="flex items-center justify-center w-full h-full">
                    <button onClick={openAccountModal} className="">
                      <div className="w-[60px] h-[60px] relative">
                        <Image
                          src={profile_default}
                          alt="profile"
                          fill
                          objectFit="fi"
                          className="rounded-full border-2 border-solid border-[#BB7B00] ml-1"
                        />
                      </div>
                    </button>

                    <div className="flex flex-col w-full ml-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setShowVip((prev) => !prev);
                          setIsProfileModalOpen(true);
                        }}
                        // onMouseEnter={() => setShowVip(true)}
                        // onMouseLeave={() => setShowVip(false)}
                      >
                        <div className="w-full text-[10px] text-[#BB7B00] text-left">
                          {lang?.language == LanguageType.CN
                            ? "VIP 身份状态"
                            : "VIP Status"}
                        </div>
                        <div className="w-full text-sm font-bold text-left">
                          {account.displayName}
                        </div>
                      </div>
                      <div
                        className="w-full text-[10px] text-[#727272] text-left flex items-center gap-1 cursor-pointer"
                        onClick={() => setShowBalance((prev) => !prev)}
                      >
                        {showBalance
                          ? formatNumber(Number(userBalance?.formatted), 0)
                          : "* * * *"}{" "}
                        $JADE
                        <BiHide className="h-[1.5rem] w-[1.5rem] cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ProfileModal
              isOpen={isProfileModalOpen}
              onClose={() => setIsProfileModalOpen(false)}
            />
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
