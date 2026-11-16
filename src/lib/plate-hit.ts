export type Point = { x: number; y: number };

export type HitShape =
  | { type: "point"; r: number }
  | { type: "segment"; a: Point; b: Point; r: number }
  | { type: "ring"; c: Point; r: number; thickness: number }
  | { type: "rect"; x: number; y: number; w: number; h: number }
  | { type: "union"; shapes: HitShape[] };

export type Gradable = {
  id: string;
  label: string;
  x: number;
  y: number;
  shape: HitShape;
};

export type Grade<T extends Gradable = Gradable> =
  | { result: "correct"; mark: T }
  | { result: "other"; mark: T }
  | { result: "close" }
  | { result: "miss" };

const EXACT = 0.35;

function project(p: Point, aspect: number): Point {
  return { x: p.x, y: p.y * aspect };
}

function hypot(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Distance outside the shape, in percent of image width. 0 means inside. */
export function rawGap(
  shape: HitShape,
  anchor: Point,
  at: Point,
  aspect: number,
): number {
  if (shape.type === "union") {
    return Math.min(...shape.shapes.map((s) => rawGap(s, anchor, at, aspect)));
  }

  if (shape.type === "point") {
    return Math.max(0, hypot(project(anchor, aspect), project(at, aspect)) - shape.r);
  }

  if (shape.type === "segment") {
    const p = project(at, aspect);
    const a = project(shape.a, aspect);
    const b = project(shape.b, aspect);
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const len2 = ab.x * ab.x + ab.y * ab.y;
    const t =
      len2 === 0
        ? 0
        : Math.min(1, Math.max(0, ((p.x - a.x) * ab.x + (p.y - a.y) * ab.y) / len2));
    const q = { x: a.x + ab.x * t, y: a.y + ab.y * t };
    return Math.max(0, hypot(p, q) - shape.r);
  }

  if (shape.type === "ring") {
    const d = hypot(project(shape.c, aspect), project(at, aspect));
    return Math.max(0, Math.abs(d - shape.r) - shape.thickness / 2);
  }

  const dx =
    at.x < shape.x ? shape.x - at.x : at.x > shape.x + shape.w ? at.x - (shape.x + shape.w) : 0;
  const dyPct =
    at.y < shape.y
      ? shape.y - at.y
      : at.y > shape.y + shape.h
        ? at.y - (shape.y + shape.h)
        : 0;
  return Math.hypot(dx, dyPct * aspect);
}

function strokeBase(shape: HitShape): number | null {
  if (shape.type === "point" || shape.type === "segment") return shape.r;
  if (shape.type === "ring") return shape.thickness / 2;
  if (shape.type === "union") {
    const bases = shape.shapes
      .map(strokeBase)
      .filter((n): n is number => n != null);
    return bases.length ? Math.min(...bases) : null;
  }
  return null;
}

type Eval = { gap: number; exact: boolean; hit: boolean };

function evaluate(
  shape: HitShape,
  anchor: Point,
  at: Point,
  aspect: number,
  minStroke: number,
): Eval {
  if (shape.type === "union") {
    const parts = shape.shapes.map((s) => evaluate(s, anchor, at, aspect, minStroke));
    return {
      gap: Math.min(...parts.map((p) => p.gap)),
      exact: parts.some((p) => p.exact),
      hit: parts.some((p) => p.hit),
    };
  }

  const gap = rawGap(shape, anchor, at, aspect);
  const base = strokeBase(shape);
  const extra = base == null ? 0 : Math.max(0, minStroke - base);
  return { gap, exact: gap <= EXACT, hit: gap <= extra + 0.05 };
}

export function gradeClick<T extends Gradable>(
  marks: T[],
  targetId: string,
  at: Point,
  aspect: number,
  minStroke: number,
): Grade<T> {
  const scored = marks.map((mark) => {
    const ev = evaluate(mark.shape, mark, at, aspect, minStroke);
    return {
      mark,
      ...ev,
      anchorDist: hypot(project(mark, aspect), project(at, aspect)),
    };
  });

  const hits = scored.filter((s) => s.hit);
  const exacts = hits.filter((s) => s.exact);
  const pool = exacts.length > 0 ? exacts : hits;
  pool.sort((a, b) => a.gap - b.gap || a.anchorDist - b.anchorDist);

  const winner = pool[0];
  const target = scored.find((s) => s.mark.id === targetId);
  if (winner?.mark.id === targetId) return { result: "correct", mark: winner.mark };
  if (winner) return { result: "other", mark: winner.mark };
  if (target && target.gap < 4.5) return { result: "close" };
  return { result: "miss" };
}
