export function decimalToBinaryArray(
  n: number,
  bitLength: number = 8
): number[] {
  // Convert decimal number to binary string
  let binaryStr = n.toString(2);

  // Ensure the bit length is between 8 and 16
  bitLength = Math.min(Math.max(bitLength, 8), 16);

  // Pad the binary string with leading zeros to match the desired bit length
  binaryStr = binaryStr.padStart(bitLength, "0");

  // Convert the binary string into an array of numbers
  const binaryArray = binaryStr.split("").map((bit) => parseInt(bit, 10));

  return binaryArray;
}

export function convertSeconds(totalSeconds: number): string {
  if (totalSeconds === 0) return "0";

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days} days ${hours} h ${minutes} m`;
}

export function convertTimestampToDate(
  timestamp: number,
  locale: string = "en-US"
): string {
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
