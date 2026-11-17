import { existsSync } from "node:fs";
import { join } from "node:path";
import { flightStorageKey } from "../src/lib/flight-log";
import { flights } from "../src/lib/flights";
import { symbols } from "../src/lib/symbols";
import type { AtcLevel } from "../src/lib/flight-types";

let failed = 0;

function assert(cond: boolean, message: string) {
  if (!cond) {
    failed += 1;
    console.error("FAIL", message);
  }
}

const levels: AtcLevel[] = ["easy", "medium", "hard"];
const symbolIds = new Set(symbols.map((symbol) => symbol.id));
const used = new Set<string>();

assert(new Set(flights.map((flight) => flight.id)).size === flights.length, "duplicate flight ids");
assert(
  flights.map((flight) => flight.order).join() === "1,2,3,4,5",
  "flights are not ordered 1–5",
);

for (const flight of flights) {
  const beatIds = flight.beats.map((beat) => beat.id);
  assert(new Set(beatIds).size === beatIds.length, `${flight.id} duplicate beat ids`);
  const markIds = new Set(flight.marks.map((mark) => mark.id).filter((id): id is string => Boolean(id)));
  let mediumChain = false;
  let hardChain = false;

  for (const beat of flight.beats) {
    assert(symbolIds.has(beat.symbolId), `${flight.id}/${beat.id} unknown symbol ${beat.symbolId}`);
    assert(markIds.has(beat.zoneId), `${flight.id}/${beat.id} zone ${beat.zoneId} is not on the chart`);
    used.add(beat.symbolId);
    if (beat.medium.length >= 2) mediumChain = true;
    if (beat.hard.length >= 3) hardChain = true;

    for (const level of levels) {
      const steps = beat[level];
      assert(steps.length > 0, `${flight.id}/${beat.id} ${level} has no steps`);
      for (const [index, step] of steps.entries()) {
        const moveIds = step.moves.map((move) => move.id);
        assert(new Set(moveIds).size === moveIds.length, `${flight.id}/${beat.id} ${level}#${index} duplicate moves`);
        assert(moveIds.includes(step.correctId), `${flight.id}/${beat.id} ${level}#${index} correctId ${step.correctId} missing`);
        assert(step.prompt.length > 0 && step.bust.length > 0 && step.com.length > 0, `${flight.id}/${beat.id} empty copy`);
        assert(step.radio.length > 0, `${flight.id}/${beat.id} ${level}#${index} silent radio`);
      }
    }
  }

  assert(mediumChain, `${flight.id} has no medium amendment`);
  assert(hardChain, `${flight.id} has no three-step hard chain`);
}

for (const symbol of symbols) {
  assert(used.has(symbol.id), `symbol ${symbol.id} is never taught`);
}

const lga = flights.find((flight) => flight.id === "laguardia");
assert(Boolean(lga), "missing laguardia");
if (lga) {
  const text = JSON.stringify(lga);
  for (const needle of ["118.7", "120.8", "121.7", "125.95", "Runway 31", "Runway 4", "4/22", "13/31"]) {
    assert(text.includes(needle), `laguardia missing ${needle}`);
  }
  assert(text.toLowerCase().includes("cleared into the bravo"), "laguardia missing the Bravo phrase");
  assert(text.includes("River Visual"), "laguardia missing the River Visual warning");
}

const hudson = flights.find((flight) => flight.id === "hudson");
assert(Boolean(hudson), "missing hudson");
if (hudson) {
  const text = JSON.stringify(hudson);
  for (const needle of ["123.05", "1,000", "1,300", "west"]) {
    assert(text.includes(needle), `hudson missing ${needle}`);
  }
  assert(text.toLowerCase().includes("west shore") || text.includes("west shoreline"), "hudson missing the west shore");
  assert(Boolean(hudson.chartSrc?.includes("ny-hudson")), "hudson is not on the FAA SFRA plate");
}

assert(Boolean(lga?.chartSrc?.includes("ny-lga")), "laguardia is not on the FAA TAC plate");

for (const flight of flights) {
  if (!flight.chartSrc) continue;
  assert(Boolean(flight.chartWidth && flight.chartHeight), `${flight.id} chart plate is missing size`);
  assert(existsSync(join(process.cwd(), "public", flight.chartSrc.replace(/^\//, ""))), `${flight.id} missing ${flight.chartSrc}`);
}

const pilotA = flightStorageKey("user_a", "flights");
const pilotB = flightStorageKey("user_b", "flights");
assert(pilotA !== pilotB, "flight history is shared across accounts");
assert(flightStorageKey("user_a", "symbols") !== pilotA, "symbol log uses the flight-score key");
assert(flightStorageKey("user a/../b", "level").includes(encodeURIComponent("user a/../b")), "user id is not encoded");
assert(!pilotA.startsWith("an-flight-log"), "unscoped flight key is still in use");

if (failed > 0) {
  console.error(`${failed} flight check${failed === 1 ? "" : "s"} failed`);
  process.exit(1);
}

console.log(`flights ok: ${flights.length} flights, ${symbols.length} symbols, all used`);
