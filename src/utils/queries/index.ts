// queries/affiliatePointsClaims.ts
import { gql } from "@apollo/client";

export const GET_AFFILIATE_POINTS_CLAIMS = gql`
  query GetAffiliatePointsClaims {
    affiliatePointsClaims {
      id
      referrer
      player
      RPointAmount
      timestamp
    }
  }
`;

// export const GET_TRADER_REFERRAL_CODE_BY_OWNER = gql`
//   query GetTraderReferralCodeByOwner($owner: Bytes!) {
//     referralStorages(where: { owner: $owner }) {
//       id
//       redeemer
//       owner
//       code
//       timestamp
//     }
//   }
// `;

export const GET_JADE_WHEEL_TOTAL_BETS = gql`
  query GetJadeWheelTotalBets {
    jadeWheelTotalBets(orderBy: totalBetAmount, orderDirection: desc) {
      # id
      player
      totalBetAmount
      # timestamp
    }
  }
`;

export const GET_TOTAL_BETS = gql`
  query GetTotalBets {
    pointsUpdateds(orderBy: totalBetCount, orderDirection: desc) {
      player
      totalBetCount
    }
  }
`;

export const GET_BET_RATE = gql`
  query GetBetVolumeRate {
    pointsUpdateds(orderBy: totalBetVolume, orderDirection: desc) {
      player
      totalBetVolume
      xJadeBetVolume
      jadeWheelBetVolume
    }
  }
`;

export const GET_PVPOINT = gql`
  query GetPVPoint {
    pointsUpdateds(orderBy: PVPoint, orderDirection: desc) {
      player
      PVPoint
    }
  }
`;

export const GET_JADE_WHEEL_BET_RATE = gql`
  query JadeWheelBetRate {
    jadeWheelBetRates(orderBy: betAmount, orderDirection: desc) {
      player
      betAmount
      maxBets
      betRate
      timestamp
    }
  }
`;

export const GET_JADE_BET_RATE = gql`
  query GetBetVolumeRate {
    pointsUpdateds(orderBy: totalBetVolume, orderDirection: desc) {
      player
      totalBetVolume
      xJadeBetVolume
      jadeWheelBetVolume
    }
  }
`;

export const GET_EV_GENERATED = gql`
  query GetEVGenerated {
    evgenerateds(orderBy: EVGenerated, orderDirection: desc) {
      EVGenerated
      currentRNGFeeForTax
      currentTaxRate
      gameType
      player
      rngCost
    }
  }
`;
