export function shortenWalletAddress(address: `0x${string}`): string {
  if (!address) return ""; // Handle empty or undefined input

  // Ensure the address is a valid Ethereum address (40 hex characters + "0x")
  if (address.length !== 42) return address;

  const start = address.slice(0, 4); // First 4 characters including "0x"
  const end = address.slice(-4); // Last 4 characters

  return `${start}....${end}`;
}
