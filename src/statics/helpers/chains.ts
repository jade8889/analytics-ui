import { erc20ABI, sepolia } from "wagmi";
import jadeABI from "../abis/jade.json";
import xJadeABI from "../abis/xJade.json";
import landABI from "../abis/land.json";
import jadeWheelRNGABI from "../abis/jadeWheelRNG.json";
import jadeWheelRNGABI_TESTNET from "../abis/jadeWheelRNG_TESTNET.json";
import jadeWheelUnsafeRNGABI from "../abis/jadeWheelUnsafeRNG.json";
import wethWheelDefABI from "../abis/wethWheelDef.json";
import xJadeWheelRNGABI from "../abis/xJadeWheelRNG.json";
import wethWheelUnsafeRNGABI from "../abis/wethWheelUnsafeRNG.json";
import jadeWheelLinkWellABI from "../abis/jadeWheelLinkWell.json";
import wheelLinkWellABI from "../abis/wheelLInkWell.json";
import plinkoABI from "../abis/plinko.json";
import jackpotABI from "../abis/catJackpot.json";
import vaultABI from "../abis/vault.json";
import mineABI from "../abis/mine.json";
import chestABI from "../abis/chest.json";
import trustedForwarderABI from "../abis/trustedForwarder.json";
import jadePointSystemABI from "../abis/JadePointSystem.json";
import referralStorageABI from "../abis/referralStorage.json";
import bankrollABI from "../abis/bankroll.json";
import rngABI from "../abis/rng.json";
import { Chains } from "./types";
import ETH_logo from "@/src/statics/images/eth-logo.png";
import Jade_logo from "@/src/statics/images/jade-logo.png";
import xJade_logo from "@/src/statics/images/xjade-logo.png";
import tickets_logo from "@/src/statics/images/ticket.svg";
import JadeWheelV4ABI from "../abis/JadeWheelV4ABI.json";

export const ETH_PRICE_URL =
  "https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";

export const BASE = 8453;
export const SEPOLIA = 11155111;
export const BASE_SEPOLIA = 84532;
export const SUPPORTED_CHAIN_IDS = [BASE, SEPOLIA, BASE_SEPOLIA];
export const DEFAULT_CHAIN = BASE;

export type ChainId = keyof typeof chains;

export const chains: Chains = {
  8453: {
    symbol: "Base",
    explorer: "https://basescan.org/",
    jadePriceURL:
      "https://api.dexscreener.com/latest/dex/pairs/base/0x1610F736f1B4A2643d78C82Bdda4a364fc9D11E2",
    oldWheelAddressList: [
      "0x69E30eA0DF518D8d00f6e5A26071b16009245F34",
      "0x7a4afB5Ef76f7512f8cD05b5a15a75d2f6DFEC88",
      "0x140994A86c3fd243DA509bAbC04840e2eaDfC9D5",
      "0x47776341EF6658B23f85B6D7940396e39F89d903",
      "0x8165036eB168ACBCc88e9dAD94Bdf02829f44914",
      "0x085A1550eE7450862A5269F0be2b24DDE34668BE",
    ],
    contracts: {
      jadeToken: {
        address: "0x628c5Ba9B775DACEcd14E237130c537f497d1CC7",
        abi: jadeABI,
      },
      xJadeToken: {
        address: "0x526Fde9A0eE498afC0921CA079936970b773D42B",
        abi: xJadeABI,
      },
      jadeLP: {
        address: "0x1610F736f1B4A2643d78C82Bdda4a364fc9D11E2",
        abi: erc20ABI,
      },
      bankroll: {
        address: "",
        abi: bankrollABI,
      },
      rng: {
        address: "0x07f7182f4317a701f48481C37C9386DC1a121760",
        abi: rngABI,
      },

      jadePointSystem: {
        address: "",
        abi: jadePointSystemABI,
      },
      wheel: [
        {
          name: "default",
          address: "0x140994A86c3fd243DA509bAbC04840e2eaDfC9D5",
          abi: jadeWheelLinkWellABI,
          payoutMap: {
            0: {
              section: 2,
              probability: [0.1, 0.05, 0.05, 0.8],
            }, // 0x
            3_333: {
              section: 6,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 1/3x
            15_000: {
              section: 4,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 3/2x
            30_000: {
              section: 0,
              probability: [0.1, 0.1, 0.6, 0.2],
            }, // 3x
            80_000: {
              section: 1,
              probability: [0, 0, 1, 0],
            }, // 8x
            880_000: {
              section: 5,
              probability: [0, 0, 1, 0],
            }, // 88x
            8880_000: {
              section: 7,
              probability: [0, 0, 1, 0],
            }, // 888x
            88880_000: {
              section: 3,
              probability: [0, 0, 1, 0],
            }, // 8888x
          },
        },
        {
          name: "WETH",
          address: "0x8dBAf55d5d10eb1c28160545B99A51b93ea762B7",
          abi: wethWheelDefABI,
          payoutMap: {
            0: {
              section: 2,
              probability: [0.1, 0.05, 0.05, 0.8],
            }, // 0x
            6_666: {
              section: 6,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 2/3x
            15_000: {
              section: 4,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 3/2x
            30_000: {
              section: 0,
              probability: [0.1, 0.1, 0.6, 0.2],
            }, // 3x
            80_000: {
              section: 1,
              probability: [0, 0, 1, 0],
            }, // 8x
            880_000: {
              section: 5,
              probability: [0, 0, 1, 0],
            }, // 88x
            8880_000: {
              section: 7,
              probability: [0, 0, 1, 0],
            }, // 888x
            88880_000: {
              section: 3,
              probability: [0, 0, 1, 0],
            }, // 8888x
          },
        },
        {
          name: "xJADE",
          address: "0xeA871871841BFEde29feb5314Edc260b089c73dc",
          abi: xJadeWheelRNGABI,
          payoutMap: {
            0: {
              section: 2,
              probability: [0.1, 0.05, 0.05, 0.8],
            }, // 0x
            5_000: {
              section: 6,
              probability: [0.1, 0.1, 0.2, 0.6],
            },
            15_000: {
              section: 0,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 1.5x
            30_000: {
              section: 1,
              probability: [0.1, 0.1, 0.6, 0.2],
            }, // 3x
            6_666: {
              section: 4,
              probability: [0, 0, 1, 0],
            }, // 2/3x
            880_000: {
              section: 5,
              probability: [0, 0, 1, 0],
            }, // 88x
            8880_000: {
              section: 7,
              probability: [0, 0, 1, 0],
            }, // 888x
            88880_000: {
              section: 3,
              probability: [0, 0, 1, 0],
            }, // 8888x
          },
        },
      ],
      plinko: {
        address: "0x1610F736f1B4A2643d78C82Bdda4a364fc9D11E2",
        abi: plinkoABI,
      },
      jackpot: {
        address: "0x27321185f7acA400E38587e9F764d2e01Dd6c2A8",
        abi: jackpotABI,
      },
      vault: {
        address: "0x3E4E0627B189E329B8B1b7705cE310279196740c",
        abi: vaultABI,
      },
      land: {
        address: "",
        abi: landABI,
      },
      mine: {
        address: "0x93Bd92dD06DB42E3402C9f63420d1A72E2D9B55E",
        abi: mineABI,
      },
      chest: {
        address: "",
        abi: chestABI,
      },
      forwarder: {
        address: "",
        abi: chestABI,
        endpoint: "",
        rpc: "",
      },
      referralStorage: {
        address: "0x9186b6a5D13D48f019Df3B1373c8E5B8B4FD3479",
        abi: referralStorageABI,
      },
    },
    availableTokens: [
      {
        name: "Jade",
        symbol: "JADE",
        address: "0x628c5Ba9B775DACEcd14E237130c537f497d1CC7",
        logo: Jade_logo,
      },
      {
        name: "xJade",
        symbol: "xJADE",
        address: "0x526Fde9A0eE498afC0921CA079936970b773D42B",
        logo: xJade_logo,
      },
      {
        name: "Tickets",
        symbol: "JWT",
        address: "0x694A411e76912dd38812187e63f0b42A5b19Fa7f",
        logo: tickets_logo,
      },
      {
        name: "WETH",
        symbol: "WETH",
        address: "0x4200000000000000000000000000000000000006",
        logo: ETH_logo,
      },
    ],
  },
  // 11155111: {
  //   symbol: "Sepolia",
  //   explorer: "https://sepolia.etherscan.io/",
  //   jadePriceURL:
  //     "https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
  //   contracts: {
  //     jadeToken: {
  //       address: "0xa6b7BE1673C4bF0153B2C19f645e4aB566B30317",
  //       abi: jadeABI,
  //     },
  //     xJadeToken: {
  //       address: "",
  //       abi: xJadeABI,
  //     },
  //     jadeLP: {
  //       address: "0x3fA4CcD9De18E9a0D5323BF9705337e16FA4535D",
  //       abi: erc20ABI,
  //     },
  //     wheel: [
  //       {
  //         name: "default",
  //         address: "0x38bA18b6259C3fe72FD9B2D00B38fAaBC45Be818",
  //         abi: jadeWheelUnsafeRNGABI,
  //         payoutMap: {
  //           0: {
  //             section: 2,
  //             probability: [0.1, 0.05, 0.05, 0.8],
  //           }, // 0x
  //           3_333: {
  //             section: 6,
  //             probability: [0.1, 0.1, 0.2, 0.6],
  //           }, // 1/3x
  //           15_000: {
  //             section: 4,
  //             probability: [0.1, 0.1, 0.2, 0.6],
  //           }, // 3/2x
  //           30_000: {
  //             section: 0,
  //             probability: [0.1, 0.1, 0.6, 0.2],
  //           }, // 3x
  //           80_000: {
  //             section: 1,
  //             probability: [0, 0, 1, 0],
  //           }, // 8x
  //           880_000: {
  //             section: 5,
  //             probability: [0, 0, 1, 0],
  //           }, // 88x
  //           8880_000: {
  //             section: 7,
  //             probability: [0, 0, 1, 0],
  //           }, // 888x
  //           88880_000: {
  //             section: 3,
  //             probability: [0, 0, 1, 0],
  //           }, // 8888x
  //         },
  //       },
  //       {
  //         name: "WETH",
  //         address: "0xFb1D152Dc5b7D5BaE57016554CfAEF31a8a6c5A2",
  //         abi: wethWheelUnsafeRNGABI,
  //         payoutMap: {
  //           0: {
  //             section: 2,
  //             probability: [0.1, 0.05, 0.05, 0.8],
  //           }, // 0x
  //           6_666: {
  //             section: 6,
  //             probability: [0.1, 0.1, 0.2, 0.6],
  //           }, // 2/3x
  //           15_000: {
  //             section: 4,
  //             probability: [0.1, 0.1, 0.2, 0.6],
  //           }, // 3/2x
  //           30_000: {
  //             section: 0,
  //             probability: [0.1, 0.1, 0.6, 0.2],
  //           }, // 3x
  //           80_000: {
  //             section: 1,
  //             probability: [0, 0, 1, 0],
  //           }, // 8x
  //           880_000: {
  //             section: 5,
  //             probability: [0, 0, 1, 0],
  //           }, // 88x
  //           8880_000: {
  //             section: 7,
  //             probability: [0, 0, 1, 0],
  //           }, // 888x
  //           88880_000: {
  //             section: 3,
  //             probability: [0, 0, 1, 0],
  //           }, // 8888x
  //         },
  //       },
  //     ],
  //     land: {
  //       address: "",
  //       abi: landABI,
  //     },
  //     mine: {
  //       address: "0xe7C2961Ffb4bB0a005CCab31487b1391D2d871FC",
  //       abi: mineABI,
  //     },
  //     chest: {
  //       address: "0x8702fD072d8364f856860dEac87c7bBC27C612B6",
  //       abi: chestABI,
  //     },
  //     forwarder: {
  //       address: "0x0000000000000000000000000000000000000000",
  //       abi: trustedForwarderABI,
  //       endpoint: "",
  //       // endpoint: "https://jaderoll-backend.vercel.app/api/play",
  //       // endpoint: "http://localhost:3001/api/play",
  //       rpc: sepolia.rpcUrls.public.http[0],
  //     },
  //   },
  //   availableTokens: [
  //     {
  //       name: "Jade",
  //       symbol: "Jade",
  //       address: "0xa6b7BE1673C4bF0153B2C19f645e4aB566B30317",
  //       logo: Jade_logo,
  //     },
  //     {
  //       name: "Tickets",
  //       symbol: "Tickets",
  //       address: "0x094229AF832258c521559d90C7E09086E51d9Cf4",
  //       logo: tickets_logo,
  //     },
  //     {
  //       name: "xJade",
  //       symbol: "xJade",
  //       address: "0x8B883B8c58F9133c227d9dC626692a2b4b86d996",
  //       logo: xJade_logo,
  //     },
  //     {
  //       name: "WETH",
  //       symbol: "WETH",
  //       address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  //       logo: ETH_logo,
  //     },
  //   ],
  // },
  84532: {
    symbol: "Base Sepolia",
    explorer: "https://sepolia.basescan.org/",
    jadePriceURL:
      "https://api.dexscreener.com/latest/dex/pairs/base/0x1610F736f1B4A2643d78C82Bdda4a364fc9D11E2",
    oldWheelAddressList: [
      "0x54e07DF7C8e3daF10A3FAecEeadbC5Ec340E8909",
      "0xC702c7fdeBCACa3165F4c85bfF0152feF8AbC3bF",
      "0x3E83fdD3c6dF0af84985D48d8B31778E6b13F38B",
      "0xb0a904D8ECC316499660C7fa7e5c1F1FA153BA14",
      "0x609EBcDa97c3F35D4964C5dae795E2CdaE69FD48",
      "0xB438aa40e9cdb74525253426Dea0195d37AC58B9",
      "0xFA3230BAFBaF11c4C4291494E163Fe912b3a645E",
      "0xfb8e4E4b43f04d369DdAF97E7F094FEd309d9e37",
      "0x29f799420a381349cB7623c03C9ebFab9473F593",
      "0xece37c22D25b0E01DD8180cEBc3379297803f026",
      "0xAAfF830c25e4668B5C3383F1e3196D2dA4636599",
      "0xfA561579E4B664affd5C289e60b929460254b0CC",
      "0xB20719fD867C400051FDEF19d45Dc212ECB747e8",
      "0x0302CAccbaf3a6fD47B1957Ca7fA62d667e880B6",
    ],
    contracts: {
      jadeToken: {
        address: "0xfD1D37EE694F947770eF097d8F9AB2925bF1E579",
        abi: jadeABI,
      },
      xJadeToken: {
        address: "",
        abi: xJadeABI,
      },
      jadeLP: {
        address: "0xF6148A31601Bc0771c68ab69C94Edb9DD34459C3",
        abi: erc20ABI,
      },
      bankroll: {
        address: "0xEfDB2b821AC9c527016Dc9DFeDbEab1705e01653",
        abi: bankrollABI,
      },
      rng: {
        address: "0x07f7182f4317a701f48481C37C9386DC1a121760",
        abi: rngABI,
      },
      jadePointSystem: {
        address: "0xc45e58Bbdf9d2A9b95DdEf1594A75881ACe09d46",
        abi: jadePointSystemABI,
      },
      wheel: [
        {
          name: "default",
          address: "0x0065AD764f8B9630Af610a1d8e741a36f4A63c77",
          abi: JadeWheelV4ABI,
          payoutMap: {
            0: {
              section: 2,
              probability: [0.1, 0.05, 0.05, 0.8],
            }, // 0x
            3_333: {
              section: 6,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 1/3x
            15_000: {
              section: 4,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 3/2x
            30_000: {
              section: 0,
              probability: [0.1, 0.1, 0.6, 0.2],
            }, // 3x
            80_000: {
              section: 1,
              probability: [0, 0, 1, 0],
            }, // 8x
            880_000: {
              section: 5,
              probability: [0, 0, 1, 0],
            }, // 88x
            8880_000: {
              section: 7,
              probability: [0, 0, 1, 0],
            }, // 888x
            88880_000: {
              section: 3,
              probability: [0, 0, 1, 0],
            }, // 8888x
          },
        },
        {
          name: "xJADE",
          address: "0x18672aCb875846383F635A07c425D452EEbDa99e",
          abi: wheelLinkWellABI,
          payoutMap: {
            0: {
              section: 2,
              probability: [0.1, 0.05, 0.05, 0.8],
            }, // 0x
            5_000: {
              section: 6,
              probability: [0.1, 0.1, 0.2, 0.6],
            },
            15_000: {
              section: 0,
              probability: [0.1, 0.1, 0.2, 0.6],
            }, // 1.5x
            30_000: {
              section: 1,
              probability: [0.1, 0.1, 0.6, 0.2],
            }, // 3x
            6_666: {
              section: 4,
              probability: [0, 0, 1, 0],
            }, // 2/3x
            880_000: {
              section: 5,
              probability: [0, 0, 1, 0],
            }, // 88x
            8880_000: {
              section: 7,
              probability: [0, 0, 1, 0],
            }, // 888x
            88880_000: {
              section: 3,
              probability: [0, 0, 1, 0],
            }, // 8888x
          },
        },
      ],
      plinko: {
        address: "0x51Dd45199046ae97D9709ED0aFF6cd0322f8fFD7",
        abi: plinkoABI,
      },
      jackpot: {
        address: "0x77f0AFD797bFa6ED91D6bbe418D636C793615c77",
        abi: jackpotABI,
      },
      vault: {
        address: "0xe7a876928583655095B6FC31e48A11FaC48FFF1A",
        abi: vaultABI,
      },
      land: {
        address: "",
        abi: landABI,
      },
      mine: {
        address: "",
        abi: mineABI,
      },
      chest: {
        address: "",
        abi: chestABI,
      },
      forwarder: {
        address: "0x0BbDd4d1924aA702613D0A9d05283cF599aAE00c",
        abi: trustedForwarderABI,
        // endpoint: "http://localhost:3003/api/play", // local
        endpoint: "https://api.jaderoll.xyz/api/play/testnet", // server
        rpc: "https://sepolia.base.org/",
      },
      referralStorage: {
        address: "0xdD5243571AadC7f3fAAA558Ef8090dd0eFc1F256",
        abi: referralStorageABI,
      },
    },
    availableTokens: [
      {
        name: "Jade",
        symbol: "JADE",
        address: "0xfD1D37EE694F947770eF097d8F9AB2925bF1E579",
        logo: Jade_logo,
      },
      {
        name: "xJade",
        symbol: "xJADE",
        address: "0x2dD4df485b93a6Eb06F08C6Ea9C35781174D177C",
        logo: xJade_logo,
      },
      {
        name: "RPoint",
        symbol: "RPOINT",
        address: "0xC6460652D142B86CA30De4709789078C68FBA6Fc",
        logo: xJade_logo,
      },
    ],
  },
};
