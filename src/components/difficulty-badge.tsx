import type { Difficulty } from "@/lib/courses";

const labels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <span className={`difficulty difficulty--${level}`}>{labels[level]}</span>;
}
