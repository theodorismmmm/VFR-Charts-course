"use client";

import { useSyncExternalStore } from "react";
import type { AtcLevel } from "@/lib/flight-types";

export const ATC_LEVEL_KEY = "an-atc-level";

const listeners = new Set<() => void>();

const options: Array<{ id: AtcLevel; label: string; detail: string }> = [
  { id: "easy", label: "Basic", detail: "Full plan up front" },
  { id: "medium", label: "Medium", detail: "One late amendment" },
  { id: "hard", label: "Hard", detail: "Last-second changes" },
];

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function parseLevel(value: string | null): AtcLevel {
  if (value === "medium" || value === "hard") return value;
  return "easy";
}

function readLevel(): AtcLevel {
  try {
    return parseLevel(window.localStorage.getItem(ATC_LEVEL_KEY));
  } catch {
    return "easy";
  }
}

export function setAtcLevel(level: AtcLevel) {
  window.localStorage.setItem(ATC_LEVEL_KEY, level);
  emit();
}

export function useAtcLevel() {
  const level = useSyncExternalStore(subscribe, readLevel, () => "easy" as AtcLevel);
  return { level, setLevel: setAtcLevel };
}

export function AtcLevelSwitch({
  level,
  onChange,
  disabled,
}: {
  level: AtcLevel;
  onChange: (level: AtcLevel) => void;
  disabled?: boolean;
}) {
  return (
    <div className="fly-level" role="radiogroup" aria-label="ATC level">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={level === option.id}
          className={level === option.id ? "is-on" : undefined}
          disabled={disabled}
          onClick={() => onChange(option.id)}
        >
          <strong>{option.label}</strong>
          <span>{option.detail}</span>
        </button>
      ))}
    </div>
  );
}
