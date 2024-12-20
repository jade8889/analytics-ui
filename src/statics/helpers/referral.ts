import { ethers } from "ethers";

// Define the maximum referral code length (adjust as necessary)
const MAX_REFERRAL_CODE_LENGTH = 32;

export function decodeReferralCode(hexCode: string): string {
  try {
    return ethers.decodeBytes32String(hexCode);
  } catch (ex) {
    let code = "";
    hexCode = hexCode.substring(2); // Remove the '0x' prefix
    for (let i = 0; i < 32; i++) {
      code += String.fromCharCode(
        parseInt(hexCode.substring(i * 2, i * 2 + 2), 16)
      );
    }
    return code.trim();
  }
}

export function encodeReferralCode(code: string): string {
  let final = code.replace(/[^\w_]/g, ""); // Replace everything other than alphanumeric and underscores
  if (final.length > MAX_REFERRAL_CODE_LENGTH) {
    return ethers.ZeroHash;
  }
  return ethers.encodeBytes32String(final);
}
