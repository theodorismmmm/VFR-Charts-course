"use client";

import Image from "next/image";
import { useState } from "react";
import { gradeClick, type HitShape, type Point } from "@/lib/plate-hit";
import type { Mark, Plate, Side } from "@/lib/plates";

type Mode = "study" | "quiz";
type Status = "asking" | "correct" | "revealed";
type Result = "found" | "missed";

const SIDE_CLASS: Record<Side, string> = {
  n: "plate__tag--n",
  ne: "plate__tag--ne",
  e: "plate__tag--e",
  se: "plate__tag--se",
  s: "plate__tag--s",
  sw: "plate__tag--sw",
  w: "plate__tag--w",
  nw: "plate__tag--nw",
};

export function MarkedPlate({ plate }: { plate: Plate }) {
  const [mode, setMode] = useState<Mode>(plate.start);
  const [activeId, setActiveId] = useState(plate.marks[0]?.id ?? "");
  const [step, setStep] = useState(0);
  const [tries, setTries] = useState(0);
  const [status, setStatus] = useState<Status>("asking");
  const [note, setNote] = useState<string | null>(null);
  const [hintOn, setHintOn] = useState(false);
  const [clickAt, setClickAt] = useState<Point | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const total = plate.questions.length;
  const finished = results.length === total && status !== "asking";
  const question = plate.questions[Math.min(step, total - 1)];
  const target = plate.marks.find((m) => m.id === question?.markId);
  const active = plate.marks.find((m) => m.id === activeId) ?? plate.marks[0];

  function resetQuiz() {
    setStep(0);
    setTries(0);
    setStatus("asking");
    setNote(null);
    setHintOn(false);
    setClickAt(null);
    setResults([]);
  }

  function showSpot() {
    if (!target || status !== "asking") return;
    setResults((prev) => [...prev, "missed"]);
    setStatus("revealed");
    setNote(target.detail);
    setClickAt(null);
  }

  function onChartClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (mode !== "quiz" || status !== "asking" || !question || !target) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const at = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
    const minStroke = (18 / rect.width) * 100;
    const grade = gradeClick(
      plate.marks,
      question.markId,
      at,
      plate.height / plate.width,
      minStroke,
    );
    setClickAt(at);

    if (grade.result === "correct") {
      setResults((prev) => [...prev, "found"]);
      setStatus("correct");
      setNote(target.detail);
      return;
    }

    const nextTries = tries + 1;
    setTries(nextTries);
    const hint = nextTries >= 2 || hintOn ? ` ${question.hint}` : "";
    if (grade.result === "other") {
      setNote(`${grade.mark.miss}${hint}`);
    } else if (grade.result === "close") {
      setNote(`Close. Try a little nearer.${hint}`);
    } else {
      setNote(`Not there.${hint}`);
    }
    if (nextTries >= 3) {
      setResults((prev) => [...prev, "missed"]);
      setStatus("revealed");
      setNote(`Here it is. ${target.detail}`);
      setClickAt(null);
    }
  }

  function advance() {
    if (step >= total - 1) return;
    setStep((n) => n + 1);
    setTries(0);
    setStatus("asking");
    setNote(null);
    setHintOn(false);
    setClickAt(null);
  }

  const found = results.filter((r) => r === "found").length;
  const highlight =
    mode === "study" ? active : status !== "asking" && target ? target : undefined;

  return (
    <figure className="plate">
      <div className="plate__tabs" role="tablist" aria-label="Picture mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "study"}
          className="plate__tab"
          onClick={() => setMode("study")}
        >
          Study the marks
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "quiz"}
          className="plate__tab"
          onClick={() => setMode("quiz")}
        >
          Point to it
        </button>
      </div>

      {mode === "quiz" && !finished && question ? (
        <div className="plate__prompt-block">
          <p className="plate__kicker">
            Spot {Math.min(step + 1, total)} of {total}
          </p>
          <p className="plate__prompt">{question.prompt}</p>
        </div>
      ) : null}

      {mode === "quiz" && finished ? (
        <div className="plate__prompt-block">
          <p className="plate__kicker">Point to it</p>
          <p className="plate__prompt">
            {found} of {total} found.
          </p>
        </div>
      ) : null}

      <div className="plate__stage">
        <div
          className="plate__frame"
          style={{ aspectRatio: `${plate.width} / ${plate.height}` }}
        >
          {plate.src.endsWith(".svg") ? (
            // Vector training chart. The image optimizer rejects SVG.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={plate.src}
              alt={plate.alt}
              className="plate__img"
              draggable={false}
            />
          ) : (
            <Image
              src={plate.src}
              alt={plate.alt}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 58vw"
              className="plate__img"
              style={{ objectFit: "contain" }}
            />
          )}
          <svg
            className="plate__draw"
            viewBox={`0 0 ${plate.width} ${plate.height}`}
            aria-hidden
          >
            {highlight ? (
              <ShapeGlyph
                shape={highlight.shape}
                anchor={highlight}
                width={plate.width}
                height={plate.height}
                tone={
                  mode === "quiz" && status === "correct"
                    ? "ok"
                    : mode === "quiz" && status === "revealed"
                      ? "miss"
                      : "study"
                }
              />
            ) : null}
          </svg>
          {clickAt && status === "asking" ? (
            <span
              className="plate__miss"
              style={{ left: `${clickAt.x}%`, top: `${clickAt.y}%` }}
            />
          ) : null}
          {mode === "quiz" && status === "asking" ? (
            <button
              type="button"
              className="plate__hit"
              aria-label={`${question?.prompt ?? "Answer"} Click the picture.`}
              onClick={onChartClick}
            />
          ) : null}
        </div>

        {mode === "study"
          ? plate.marks.map((item, index) => (
              <Pin
                key={item.id}
                mark={item}
                index={index + 1}
                pressed={item.id === active?.id}
                showTag={plate.labels === "all" || item.id === active?.id}
                onSelect={() => setActiveId(item.id)}
              />
            ))
          : null}

        {mode === "quiz" && status !== "asking" && target ? (
          <Pin
            mark={target}
            index={plate.marks.findIndex((m) => m.id === target.id) + 1}
            pressed
            showTag
            tone={status === "correct" ? "ok" : "miss"}
          />
        ) : null}

        {finished
          ? plate.questions.map((item, index) => {
              const spot = plate.marks.find((m) => m.id === item.markId);
              if (!spot || spot.id === target?.id) return null;
              return (
                <Pin
                  key={item.id}
                  mark={spot}
                  index={plate.marks.findIndex((m) => m.id === spot.id) + 1}
                  pressed={false}
                  showTag={false}
                  tone={results[index] === "found" ? "ok" : "miss"}
                />
              );
            })
          : null}
      </div>

      <figcaption className="plate__caption">
        <strong>{plate.caption}</strong>
        <span>{plate.credit}</span>
      </figcaption>

      {mode === "study" && active ? (
        <div className="plate__keylist">
          {plate.marks.map((item, index) => {
            const on = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                className={on ? "plate__key is-on" : "plate__key"}
                aria-pressed={on}
                onClick={() => setActiveId(item.id)}
              >
                <span className="plate__key-num">{index + 1}</span>
                <span>
                  <strong>{item.label}</strong>
                  {on ? <span className="plate__key-detail">{item.detail}</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {mode === "quiz" ? (
        <div className="plate__quiz">
          {note ? (
            <p className="plate__note" role="status">
              {note}
            </p>
          ) : (
            <p className="plate__note plate__note--quiet">
              Click the picture where it is.
            </p>
          )}

          {status === "asking" && question ? (
            <div className="plate__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setHintOn(true);
                  setNote(question.hint);
                }}
              >
                Hint
              </button>
              <button type="button" className="btn btn--ghost" onClick={showSpot}>
                Show me
              </button>
            </div>
          ) : null}

          {status !== "asking" && !finished ? (
            <div className="plate__actions">
              <button type="button" className="btn btn--primary" onClick={advance}>
                Next spot
              </button>
            </div>
          ) : null}

          {finished ? (
            <>
              <ul className="plate__score">
                {plate.questions.map((item, index) => {
                  const spot = plate.marks.find((m) => m.id === item.markId);
                  const ok = results[index] === "found";
                  return (
                    <li key={item.id} className={ok ? "is-found" : "is-missed"}>
                      {ok ? "Found" : "Shown"} — {spot?.label}
                    </li>
                  );
                })}
              </ul>
              <div className="plate__actions">
                <button type="button" className="btn btn--primary" onClick={resetQuiz}>
                  Try again
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setMode("study")}
                >
                  Study the marks
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}

function Pin({
  mark,
  index,
  pressed,
  showTag,
  onSelect,
  tone,
}: {
  mark: Mark;
  index: number;
  pressed: boolean;
  showTag: boolean;
  onSelect?: () => void;
  tone?: "ok" | "miss";
}) {
  const className = [
    "plate__pin",
    tone === "ok" ? "plate__pin--ok" : "",
    tone === "miss" ? "plate__pin--miss" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const style = { left: `${mark.x}%`, top: `${mark.y}%` };
  const body = (
    <>
      <span className="plate__num">{index}</span>
      <span className={showTag ? `plate__tag ${SIDE_CLASS[mark.side]}` : "plate__tag plate__tag--off"}>
        {mark.label}
      </span>
    </>
  );

  if (!onSelect) {
    return (
      <span className={className} style={style} aria-hidden>
        {body}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-pressed={pressed}
      aria-label={`${index}. ${mark.label}`}
      onClick={onSelect}
    >
      {body}
    </button>
  );
}

function ShapeGlyph({
  shape,
  anchor,
  width,
  height,
  tone,
}: {
  shape: HitShape;
  anchor: Point;
  width: number;
  height: number;
  tone: "study" | "ok" | "miss";
}) {
  const stroke = width * 0.012;
  const className =
    tone === "ok" ? "plate__glyph plate__glyph--ok" : tone === "miss" ? "plate__glyph plate__glyph--miss" : "plate__glyph";

  if (shape.type === "union") {
    return (
      <>
        {shape.shapes.map((child, index) => (
          <ShapeGlyph
            key={index}
            shape={child}
            anchor={anchor}
            width={width}
            height={height}
            tone={tone}
          />
        ))}
      </>
    );
  }

  if (shape.type === "segment") {
    return (
      <line
        className={className}
        x1={(shape.a.x / 100) * width}
        y1={(shape.a.y / 100) * height}
        x2={(shape.b.x / 100) * width}
        y2={(shape.b.y / 100) * height}
        strokeWidth={stroke}
      />
    );
  }

  if (shape.type === "rect") {
    return (
      <rect
        className={className}
        x={(shape.x / 100) * width}
        y={(shape.y / 100) * height}
        width={(shape.w / 100) * width}
        height={(shape.h / 100) * height}
        strokeWidth={stroke}
      />
    );
  }

  if (shape.type === "ring") {
    return (
      <circle
        className={className}
        cx={(shape.c.x / 100) * width}
        cy={(shape.c.y / 100) * height}
        r={(shape.r / 100) * width}
        strokeWidth={stroke}
      />
    );
  }

  return (
    <circle
      className={className}
      cx={(anchor.x / 100) * width}
      cy={(anchor.y / 100) * height}
      r={(shape.r / 100) * width}
      strokeWidth={stroke}
    />
  );
}
