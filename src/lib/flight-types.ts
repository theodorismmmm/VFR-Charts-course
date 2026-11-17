export type AtcLevel = "easy" | "medium" | "hard";

export type RadioLine = {
  who: string;
  text: string;
};

export type Move = {
  id: string;
  text: string;
};

export type Step = {
  /** Frequency box, e.g. "122.9  North Harbor CTAF". */
  com: string;
  radio: RadioLine[];
  prompt: string;
  moves: Move[];
  correctId: string;
  /** Why the other taps are a bust. */
  bust: string;
};

export type Beat = {
  id: string;
  phase: string;
  /** Chart mark to light up. */
  zoneId: string;
  symbolId: string;
  /** Aircraft position in the 1000×640 chart. */
  x: number;
  y: number;
  /** Degrees clockwise from north. */
  heading: number;
  situation: string;
  easy: Step[];
  medium: Step[];
  hard: Step[];
};

export type ChartMark =
  | { id?: string; kind: "water"; d: string }
  | { id?: string; kind: "shade"; d: string; fill: string }
  | {
      id?: string;
      kind: "ring";
      cx: number;
      cy: number;
      r: number;
      stroke: string;
      dash?: string;
      sw?: number;
      label?: string;
      lx?: number;
      ly?: number;
    }
  | {
      id?: string;
      kind: "path";
      d: string;
      stroke: string;
      dash?: string;
      sw?: number;
    }
  | {
      id?: string;
      kind: "label";
      x: number;
      y: number;
      text: string;
      fill?: string;
      size?: number;
      anchor?: "start" | "middle" | "end";
    }
  | {
      id?: string;
      kind: "airport";
      x: number;
      y: number;
      tower: boolean;
      name: string;
      detail: string;
      rot?: number;
    }
  | { id?: string; kind: "runway"; x: number; y: number; len: number; rot: number; name: string }
  | { id?: string; kind: "flag"; x: number; y: number; name: string }
  | { id?: string; kind: "report"; x: number; y: number; name: string }
  | { id?: string; kind: "mef"; x: number; y: number; text: string }
  | { id?: string; kind: "obstruction"; x: number; y: number; label: string }
  | { id?: string; kind: "vor"; x: number; y: number; name: string; freq: string }
  | { id?: string; kind: "box"; x: number; y: number; w: number; h: number; label: string }
  | { id?: string; kind: "para"; x: number; y: number }
  | { id?: string; kind: "heli"; x: number; y: number; name: string }
  | { id?: string; kind: "private"; x: number; y: number; name: string }
  | { id?: string; kind: "holdshort"; x: number; y: number }
  | { id?: string; kind: "cone"; x: number; y: number }
  | { id?: string; kind: "note"; x: number; y: number; lines: string[] };

export type Flight = {
  id: string;
  order: number;
  code: string;
  airport: string;
  title: string;
  airspace: string;
  summary: string;
  chartTitle: string;
  track: string;
  marks: ChartMark[];
  beats: Beat[];
};

export function step(
  com: string,
  radio: Array<[string, string]>,
  prompt: string,
  moves: Array<[string, string]>,
  correctId: string,
  bust: string,
): Step {
  return {
    com,
    radio: radio.map(([who, text]) => ({ who, text })),
    prompt,
    moves: moves.map(([id, text]) => ({ id, text })),
    correctId,
    bust,
  };
}
