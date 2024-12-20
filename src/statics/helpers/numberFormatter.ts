export function formatNumberToCurrency(value: number, digits: number = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatNumber(value: number, digits: number | string = 2) {
  let maxDigits: number;
  if (digits === "WETH") maxDigits = 6;
  else if (typeof digits === "number") maxDigits = digits;
  else maxDigits = 2;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDigits,
  }).format(value);
}

export function decimalToPaddedHex(decimal: number, length = 64) {
  // Convert the decimal number to a hexadecimal string
  const hexString = decimal.toString(16);

  // Pad the hexadecimal string with leading zeros
  const paddedHexString = hexString.padStart(length, "0");

  // Add the '0x' prefix
  return "0x" + paddedHexString;
}

export function compactNumber(value: number, decimals: number = 2) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    notation: "compact",
    compactDisplay: "short",
  });
}
