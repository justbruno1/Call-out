export const CALLOUT_REPUTATION_COURT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

export const GENLAYER_NETWORK =
  process.env.NEXT_PUBLIC_GENLAYER_NETWORK || "bradbury";

export function requireCalloutContractAddress() {
  if (!CALLOUT_REPUTATION_COURT_ADDRESS) {
    throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is not configured");
  }

  return CALLOUT_REPUTATION_COURT_ADDRESS;
}
