"use client";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  ChainId,
  DEFAULT_CHAIN,
  ETH_PRICE_URL,
  chains,
} from "../statics/helpers/chains";
import { useContractRead } from "wagmi";
import useChain from "../hooks/useChain";
import { formatEther, parseEther } from "viem";

export enum LanguageType {
  EN = "EN",
  CN = "CN",
}

export type LanguageContextType = {
  language: LanguageType;
  setLanguage: (e: LanguageType) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);
export function useLanguageContext() {
  return useContext(LanguageContext);
}

type Props = {
  children: ReactNode;
};

export default function LanguageProvider({ children }: Props) {
  const [language, setLanguage] = useState<LanguageType>(LanguageType.EN);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
