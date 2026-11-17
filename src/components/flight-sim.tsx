"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AtcLevelSwitch, useAtcLevel } from "@/components/atc-level";
import { FlightChart } from "@/components/flight-chart";
import { SymbolGlyph } from "@/components/symbol-glyph";
import type { AtcLevel, Flight, Step } from "@/lib/flight-types";
import { flightStorageKey } from "@/lib/flight-log";
import { flights } from "@/lib/flights";
import { getSymbol } from "@/lib/symbols";

type LogKind = "atc" | "you" | "amend" | "correction";

type LogLine = {
  key: string;
  who: string;
  text: string;
  kind: LogKind;
};

type Outcome = "clean" | "corrected" | "missed";

type LegRecord = {
  beatId: string;
  phase: string;
  outcome: Outcome;
};

const waitFor: Record<AtcLevel, number> = {
  easy: 0,
  medium: 8000,
  hard: 4500,
};

export function FlightSim({ flight, userId }: { flight: Flight; userId: string }) {
  const { level, setLevel } = useAtcLevel(userId);
  const [beatIndex, setBeatIndex] = useState(0);
  const [legs, setLegs] = useState<LegRecord[]>([]);
  const [done, setDone] = useState(false);
  const [nonce, setNonce] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.flyReady = "1";
    return () => {
      delete document.documentElement.dataset.flyReady;
    };
  }, []);
  const beat = flight.beats[beatIndex];
  const nextFlight = flights.find((item) => item.order === flight.order + 1);

  function finishLeg(outcome: Outcome) {
    if (!beat) return;
    const nextLegs = [...legs, { beatId: beat.id, phase: beat.phase, outcome }];
    setLegs(nextLegs);
    if (beatIndex + 1 < flight.beats.length) {
      setBeatIndex(beatIndex + 1);
      return;
    }
    setDone(true);
    saveProgress(userId, flight, nextLegs, level);
  }

  const clean = legs.filter((leg) => leg.outcome === "clean").length;
  const corrected = legs.filter((leg) => leg.outcome === "corrected").length;
  const missed = legs.filter((leg) => leg.outcome === "missed").length;
  const ratio = legs.length === 0 ? 1 : clean / legs.length;

  return (
    <div className="fly-sim">
      <div className="fly-sim__top">
        <div>
          <p className="section__eyebrow">
            <Link href="/courses/vfr-basics/fly">Flights</Link>
            {" · "}
            {flight.code}
            {" · "}
            Leg {Math.min(beatIndex + 1, flight.beats.length)} of {flight.beats.length}
          </p>
          <h1>{flight.airport}</h1>
          <p className="fly-sim__title">{flight.title}</p>
        </div>
        <div>
          <AtcLevelSwitch level={level} disabled={done} onChange={setLevel} />
          {done ? null : <p className="fly-level-note">Changing the level restarts this leg.</p>}
        </div>
      </div>

      <ol className="fly-phases">
        {flight.beats.map((item, index) => {
          const leg = legs.find((entry) => entry.beatId === item.id);
          const state = leg ? leg.outcome : index === beatIndex && !done ? "now" : "wait";
          return (
            <li key={item.id} className={`is-${state}`}>
              {item.phase}
            </li>
          );
        })}
      </ol>

      <div className="fly-deck">
        <figure className="fly-plate">
          <FlightChart
            title={flight.chartTitle}
            marks={flight.marks}
            track={flight.track}
            activeId={beat.zoneId}
            x={beat.x}
            y={beat.y}
            heading={beat.heading}
          />
          <figcaption>
            {flight.chartTitle}. The gold mark is the symbol this leg is about. Call sign Cessna 123AB.
          </figcaption>
        </figure>

        <section className="fly-radio" aria-label="Radio">
          {done ? (
            <GradeSlip
              flight={flight}
              legs={legs}
              clean={clean}
              corrected={corrected}
              missed={missed}
              level={level}
              ratio={ratio}
              nextHref={nextFlight ? `/courses/vfr-basics/fly/${nextFlight.id}` : "/courses/vfr-basics/fly"}
              nextLabel={nextFlight ? nextFlight.airport : "All flights"}
              onAgain={() => {
                setLegs([]);
                setDone(false);
                setBeatIndex(0);
                setNonce((value) => value + 1);
              }}
            />
          ) : (
            <LegPlay
              key={`${flight.id}-${beatIndex}-${level}-${nonce}`}
              flight={flight}
              beatIndex={beatIndex}
              level={level}
              reduced={reduced}
              onResult={finishLeg}
              onRestart={() => setNonce((value) => value + 1)}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function LegPlay({
  flight,
  beatIndex,
  level,
  reduced,
  onResult,
  onRestart,
}: {
  flight: Flight;
  beatIndex: number;
  level: AtcLevel;
  reduced: boolean;
  onResult: (outcome: Outcome) => void;
  onRestart: () => void;
}) {
  const beat = flight.beats[beatIndex];
  const steps = beat[level];
  const symbol = getSymbol(beat.symbolId);
  const [stepIndex, setStepIndex] = useState(0);
  const [lines, setLines] = useState<LogLine[]>(() => openingLines(steps[0], level));
  const [busts, setBusts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [live, setLive] = useState(() => liveText(openingLines(steps[0], level)));
  const [symbolOpen, setSymbolOpen] = useState(level === "easy");
  const [handed, setHanded] = useState<Outcome | null>(null);
  const applied = useRef(0);
  const busy = useRef(false);
  const gate = useRef(0);
  const serial = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const bustRef = useRef<HTMLDivElement>(null);
  const step = steps[stepIndex];

  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (locked) bustRef.current?.scrollIntoView({ block: "center" });
  }, [locked]);

  useEffect(() => {
    if (locked || level === "easy" || stepIndex >= steps.length - 1) return;
    const from = stepIndex;
    const next = steps[from + 1];
    const timer = window.setTimeout(() => {
      if (applied.current !== from) return;
      applied.current = from + 1;
      armGate(gate);
      busy.current = false;
      const added = amendedLines(next, level, () => {
        serial.current += 1;
        return `a${serial.current}`;
      });
      setLines((prev) => [...prev, ...added]);
      setLive(liveText(added.filter((line) => line.kind === "atc")));
      setStepIndex(from + 1);
      setLocked(false);
    }, waitFor[level]);
    return () => window.clearTimeout(timer);
  }, [locked, level, stepIndex, steps]);

  function advance(nextIndex: number) {
    if (applied.current !== nextIndex - 1) return;
    const next = steps[nextIndex];
    if (!next) return;
    applied.current = nextIndex;
    armGate(gate);
    busy.current = false;
    const added = amendedLines(next, level, () => {
      serial.current += 1;
      return `a${serial.current}`;
    });
    setLines((prev) => [...prev, ...added]);
    setLive(liveText(added.filter((line) => line.kind === "atc")));
    setStepIndex(nextIndex);
    setLocked(false);
  }

  function choose(moveId: string) {
    if (!step || locked || busy.current) return;
    if (gateClosed(gate)) return;
    if (applied.current !== stepIndex) return;
    const move = step.moves.find((item) => item.id === moveId);
    if (!move) return;
    busy.current = true;
    serial.current += 1;
    setLines((prev) => [
      ...prev,
      { key: `y${serial.current}`, who: "You", text: move.text, kind: "you" },
    ]);
    if (moveId === step.correctId) {
      if (stepIndex < steps.length - 1) advance(stepIndex + 1);
      else setHanded(busts === 0 ? "clean" : "corrected");
      return;
    }
    setBusts((count) => count + 1);
    setLocked(true);
  }

  function concede() {
    if (!step) return;
    const right = step.moves.find((item) => item.id === step.correctId);
    if (!right) return;
    serial.current += 1;
    setLines((prev) => [
      ...prev,
      { key: `c${serial.current}`, who: "Correction", text: right.text, kind: "correction" },
    ]);
    setLocked(false);
    busy.current = false;
    if (stepIndex < steps.length - 1) advance(stepIndex + 1);
    else setHanded("missed");
  }

  const pendingAmend = !locked && level !== "easy" && stepIndex < steps.length - 1;

  return (
    <>
      <div className="fly-com">
        <span>COM</span>
        <strong>{step.com}</strong>
      </div>
      <p className="fly-situation">{beat.situation}</p>
      <div className="fly-log" ref={logRef}>
        {lines.length === 0 ? (
          <p className="fly-log__empty">No transmission. The chart is the brief. Answer from the symbol.</p>
        ) : null}
        {lines.map((line) => (
          <p key={line.key} className={`fly-line fly-line--${line.kind}`}>
            <span>{line.who}</span>
            {line.text}
          </p>
        ))}
      </div>
      <div className="fly-live" aria-live="assertive">
        {live}
      </div>

      {pendingAmend ? (
        <div className="fly-amend">
          {reduced ? (
            <p>This clearance can still change. Waiting is not a bust. The old plan is.</p>
          ) : (
            <div
              key={`${beat.id}-${stepIndex}-${level}`}
              className="fly-amend__bar"
              style={{ animationDuration: `${waitFor[level]}ms` }}
            />
          )}
        </div>
      ) : null}

          {handed ? (
        <button type="button" className="btn btn--primary" onClick={() => onResult(handed)}>
          Next leg
        </button>
      ) : (
        <>
          <p className="fly-prompt">
            {step.prompt}
            {steps.length > 1 ? ` Clearance ${stepIndex + 1} of ${steps.length}.` : ""}
          </p>
          {locked ? (
            <div className="fly-bust" role="alert" ref={bustRef}>
              <p>{step.bust}</p>
              <button type="button" className="btn btn--primary" onClick={concede}>
                Continue with the corrected call
              </button>
            </div>
          ) : null}
          <div className="fly-moves">
            {step.moves.map((move) => (
              <button key={move.id} type="button" disabled={locked} onClick={() => choose(move.id)}>
                {move.text}
              </button>
            ))}
          </div>
        </>
      )}

      <button type="button" className="fly-restart" onClick={onRestart}>
        Restart this leg
      </button>

      <article className="fly-symbol">
        <header>
          <SymbolGlyph id={symbol.id} />
          <div>
            <p>Chart symbol</p>
            <h2>{symbol.name}</h2>
          </div>
        </header>
        <p>{symbol.line}</p>
        {symbolOpen ? <p className="fly-symbol__body">{symbol.body}</p> : null}
        <button type="button" onClick={() => setSymbolOpen((open) => !open)}>
          {symbolOpen ? "Hide the legend note" : "Open the legend note"}
        </button>
      </article>
    </>
  );
}

function GradeSlip({
  flight,
  legs,
  clean,
  corrected,
  missed,
  level,
  ratio,
  nextHref,
  nextLabel,
  onAgain,
}: {
  flight: Flight;
  legs: LegRecord[];
  clean: number;
  corrected: number;
  missed: number;
  level: AtcLevel;
  ratio: number;
  nextHref: string;
  nextLabel: string;
  onAgain: () => void;
}) {
  const levelLabel = level === "easy" ? "Basic" : level === "medium" ? "Medium" : "Hard";
  return (
    <div className="fly-slip">
      <p className="fly-slip__kicker">Training record</p>
      <h2>
        {flight.code} · {levelLabel}
      </h2>
      <dl>
        <div>
          <dt>Clean</dt>
          <dd>{clean}</dd>
        </div>
        <div>
          <dt>Corrected</dt>
          <dd>{corrected}</dd>
        </div>
        <div>
          <dt>Missed</dt>
          <dd>{missed}</dd>
        </div>
      </dl>
      <ol>
        {legs.map((leg) => (
          <li key={leg.beatId}>
            <span>{leg.phase}</span>
            <em>{leg.outcome}</em>
          </li>
        ))}
      </ol>
      {level !== "easy" && ratio < 0.7 ? (
        <p>
          The readbacks are still moving at {levelLabel}. Fly this one on Basic until the calls are clean, then
          Medium, then come back to {levelLabel}.
        </p>
      ) : (
        <p>
          Clean means the last clearance was flown with your own readback. Corrected means the phrase was handed
          over once and the leg was still finished.
        </p>
      )}
      <div className="fly-slip__actions">
        <button type="button" className="btn btn--ghost" onClick={onAgain}>
          Fly it again
        </button>
        <Link href={nextHref} className="btn btn--primary">
          {nextLabel}
        </Link>
      </div>
    </div>
  );
}

function useReducedMotion() {
  return useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
}

function subscribeMotion(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function armGate(gate: { current: number }) {
  gate.current = performance.now() + 400;
}

function gateClosed(gate: { current: number }) {
  return performance.now() < gate.current;
}

function spoken(step: Step, level: AtcLevel) {
  if (level === "easy") return step.radio;
  return step.radio.filter((line) => line.who !== "Instructor");
}

function openingLines(step: Step, level: AtcLevel): LogLine[] {
  return spoken(step, level).map((line, index) => ({
    key: `open-${index}`,
    who: line.who,
    text: line.text,
    kind: "atc" as const,
  }));
}

function amendedLines(step: Step, level: AtcLevel, key: () => string): LogLine[] {
  const radio = spoken(step, level).map((line) => ({
    key: key(),
    who: line.who,
    text: line.text,
    kind: "atc" as const,
  }));
  return [{ key: key(), who: "ATC", text: "AMENDED", kind: "amend" }, ...radio];
}

function liveText(lines: LogLine[]) {
  return lines.map((line) => `${line.who}. ${line.text}`).join(" ");
}

function saveProgress(userId: string, flight: Flight, legs: LegRecord[], level: AtcLevel) {
  const symbolsKey = flightStorageKey(userId, "symbols");
  const flightsKey = flightStorageKey(userId, "flights");
  const known = readIds(symbolsKey);
  for (const beat of flight.beats) known.add(beat.symbolId);
  window.localStorage.setItem(symbolsKey, JSON.stringify([...known]));
  const log = readObject(flightsKey);
  log[flight.id] = {
    clean: legs.filter((leg) => leg.outcome === "clean").length,
    total: legs.length,
    level,
    at: Date.now(),
  };
  window.localStorage.setItem(flightsKey, JSON.stringify(log));
}

function readIds(key: string) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set<string>();
  }
}

function readObject(key: string) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "{}") as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {} as Record<string, unknown>;
    return parsed as Record<string, unknown>;
  } catch {
    return {} as Record<string, unknown>;
  }
}
