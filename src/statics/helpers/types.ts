import { StaticImport } from "next/dist/shared/lib/get-img-props";
import * as PIXI from "pixi.js";

export type FetchBalanceResult = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};

export type Chains = {
  8453: ChainData; // base mainnet
  // 11155111: ChainData; // sepolia
  84532: ChainData; // base sepolia
  // 31337: ChainData;
  // 43113: ChainData;
};

export type Token = {
  symbol: string;
  address: string;
  logo: StaticImport;
  balance?: bigint | undefined;
  name: string;
};

export type ChainData = {
  symbol: string;
  explorer: string;
  jadePriceURL: string;
  contracts: Contracts;
  availableTokens: Token[];
  oldWheelAddressList?: string[];
};

export type Contracts = {
  jadeToken: Contract;
  xJadeToken: Contract;
  jadeLP: Contract;
  wheel: Wheel[];
  plinko: Contract;
  jackpot: Contract;
  vault: Contract;
  land: Contract;
  mine: Contract;
  chest: Contract;
  forwarder: Forwarder;
  jadePointSystem: Contract;
  bankroll: Contract;
  rng: Contract;
  referralStorage: Contract;
};

export type Wheel = Contract & { name: string; payoutMap: any };

export type Contract = {
  address: string;
  abi: any;
};

export type Forwarder = {
  address: string;
  abi: any;
  endpoint: string;
  rpc: string;
};

export interface CustomSprite extends PIXI.Sprite {
  originalTint: PIXI.ColorSource;
  type: String;
  eventClick: Boolean;
}

export type Vest = {
  startTimestamp: number;
  amount: number;
  toDate: number;
  vested: number;
  vestId: number;
};
