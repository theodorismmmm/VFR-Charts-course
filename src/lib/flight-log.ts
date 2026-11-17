export type FlightLogName = "level" | "symbols" | "flights";

/** Browser key for one signed-in pilot. The old unscoped keys are not read. */
export function flightStorageKey(userId: string, name: FlightLogName): string {
  if (!userId) throw new Error("flight storage needs a user");
  return `an:${name}:${encodeURIComponent(userId)}`;
}
