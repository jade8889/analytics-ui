"use client";

import useChain from "@/src/hooks/useChain";
import { ChainId } from "@/src/statics/helpers/chains";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { FaWallet } from "react-icons/fa";
import { useAccount, useSwitchNetwork } from "wagmi";
import { TbSwitch3 } from "react-icons/tb";

export default function Web3AccountVerifier({
  onlyOn = null,
  children,
}: {
  onlyOn?: ChainId[] | null;
  children: React.ReactNode;
}) {
  const { address } = useAccount();
  const chainId = useChain();
  const { openConnectModal } = useConnectModal();
  const { switchNetwork } = useSwitchNetwork();

  return !address ? (
    <button
      onClick={openConnectModal}
      className="rounded-md w-full flex gap-2 justify-center items-center bg-purple text-zinc-100 h-12"
    >
      <FaWallet size={23} />
      Connect Wallet
    </button>
  ) : onlyOn != null && !onlyOn.includes(chainId) ? (
    <button
      onClick={() => {
        if (switchNetwork) {
          switchNetwork(onlyOn[0]);
        }
      }}
      className="rounded-md w-full flex gap-2 justify-center items-center bg-purple text-zinc-100 h-12"
    >
      <TbSwitch3 size={23} />
      Switch to Ethereum
    </button>
  ) : (
    <div>{children}</div>
  );
}
