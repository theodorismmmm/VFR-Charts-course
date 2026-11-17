import type { Flight } from "../flight-types";
import { harbor } from "./harbor";
import { hudson } from "./hudson";
import { laguardia } from "./laguardia";
import { metro } from "./metro";
import { seaview } from "./seaview";

export const flights: Flight[] = [harbor, seaview, metro, hudson, laguardia];

const byId = new Map(flights.map((flight) => [flight.id, flight]));

export function getFlight(id: string): Flight | undefined {
  return byId.get(id);
}

export function flightsForSymbol(symbolId: string): Flight[] {
  return flights.filter((flight) => flight.beats.some((beat) => beat.symbolId === symbolId));
}
