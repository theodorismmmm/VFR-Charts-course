"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { AtcLevelSwitch, useAtcLevel } from "@/components/atc-level";
import { SymbolGlyph } from "@/components/symbol-glyph";
import { flightStorageKey } from "@/lib/flight-log";
import { flights, flightsForSymbol } from "@/lib/flights";
import { SYMBOL_GROUPS, symbols } from "@/lib/symbols";

type Score = { clean: number; total: number; level: string };

const emptyScores: Record<string, Score> = {};
const emptyLearned = new Set<string>();
let scoreCache: { key: string; raw: string; value: Record<string, Score> } = {
  key: "",
  raw: "",
  value: emptyScores,
};
let learnedCache: { key: string; raw: string; value: Set<string> } = {
  key: "",
  raw: "",
  value: emptyLearned,
};

export function FlyHome({ userId }: { userId: string }) {
  const { level, setLevel } = useAtcLevel(userId);
  const scores = useSyncExternalStore(subscribeNothing, () => readScores(userId), () => emptyScores);
  const learned = useSyncExternalStore(subscribeNothing, () => readLearned(userId), () => emptyLearned);

  const learnedCount = symbols.filter((symbol) => learned.has(symbol.id)).length;

  return (
    <div className="page-shell page-shell--wide">
      <div className="page-heading">
        <p className="section__eyebrow">
          <Link href="/courses/vfr-basics">VFR Basics</Link>
          {" · "}
          Flights
        </p>
        <h1>Fly the chart</h1>
        <p>
          Five arrivals. You tap the next call, and the symbol under that call is the one the chart is teaching.
          Basic gives you the whole plan. Medium amends it once. Hard amends it at the last second, including a
          go-around. North Harbor, Seaview, and Metro are training fields with training frequencies. The Hudson
          exclusion and the LaGuardia arrival follow the published structure. None of this is for navigation.
        </p>
        <AtcLevelSwitch level={level} onChange={setLevel} />
      </div>

      <ol className="fly-list">
        {flights.map((flight) => {
          const score = scores[flight.id];
          return (
            <li key={flight.id}>
              <Link href={`/courses/vfr-basics/fly/${flight.id}`} className="fly-card">
                <span className="fly-card__index">{String(flight.order).padStart(2, "0")}</span>
                <span>
                  <strong>
                    {flight.code} · {flight.airport}
                  </strong>
                  <em>{flight.title}</em>
                  <span>{flight.airspace}</span>
                </span>
                <span className="fly-card__score">
                  {score ? `${score.clean}/${score.total} clean` : "Not flown"}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="fly-legend">
        <header>
          <h2>Every symbol these flights use</h2>
          <p>
            {learnedCount} of {symbols.length} met in a finished flight. A symbol counts when you finish the flight
            that teaches it, clean or not.
          </p>
        </header>
        {SYMBOL_GROUPS.map((group) => (
          <div key={group}>
            <h3>{group}</h3>
            <ul>
              {symbols
                .filter((symbol) => symbol.group === group)
                .map((symbol) => {
                  const usedBy = flightsForSymbol(symbol.id);
                  return (
                    <li key={symbol.id} className={learned.has(symbol.id) ? "is-met" : undefined}>
                      <SymbolGlyph id={symbol.id} />
                      <div>
                        <strong>{symbol.name}</strong>
                        <span>{symbol.line}</span>
                        <span className="fly-legend__where">
                          {usedBy.map((flight) => flight.code).join(" · ")}
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

function subscribeNothing() {
  return () => {};
}

function readScores(userId: string) {
  const key = flightStorageKey(userId, "flights");
  let raw = "";
  try {
    raw = window.localStorage.getItem(key) ?? "";
  } catch {
    return emptyScores;
  }
  if (scoreCache.key === key && scoreCache.raw === raw) return scoreCache.value;
  const scores: Record<string, Score> = {};
  try {
    const parsed = JSON.parse(raw || "{}") as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      for (const [id, value] of Object.entries(parsed)) {
        if (!value || typeof value !== "object") continue;
        const row = value as { clean?: unknown; total?: unknown; level?: unknown };
        if (typeof row.clean !== "number" || typeof row.total !== "number") continue;
        scores[id] = {
          clean: row.clean,
          total: row.total,
          level: typeof row.level === "string" ? row.level : "easy",
        };
      }
    }
  } catch {
    scoreCache = { key, raw, value: emptyScores };
    return emptyScores;
  }
  scoreCache = { key, raw, value: scores };
  return scores;
}

function readLearned(userId: string) {
  const key = flightStorageKey(userId, "symbols");
  let raw = "";
  try {
    raw = window.localStorage.getItem(key) ?? "";
  } catch {
    return emptyLearned;
  }
  if (learnedCache.key === key && learnedCache.raw === raw) return learnedCache.value;
  try {
    const parsed = JSON.parse(raw || "[]") as unknown;
    const value = new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
    learnedCache = { key, raw, value };
    return value;
  } catch {
    learnedCache = { key, raw, value: emptyLearned };
    return emptyLearned;
  }
}
