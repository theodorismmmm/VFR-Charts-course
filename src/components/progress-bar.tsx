type ProgressBarProps = {
  completed: number;
  total: number;
  label?: string;
};

export function ProgressBar({ completed, total, label }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="progress" aria-label={label ?? "Course progress"}>
      <div className="progress__meta">
        <span>
          {completed} / {total} lessons
        </span>
        <span>{pct}%</span>
      </div>
      <div className="progress__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
