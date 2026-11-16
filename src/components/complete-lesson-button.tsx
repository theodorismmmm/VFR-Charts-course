"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  courseId: string;
  lessonId: string;
  completed: boolean;
  nextHref?: string;
};

export function CompleteLessonButton({
  courseId,
  lessonId,
  completed,
  nextHref,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(completed);

  async function onComplete() {
    setError(null);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Could not save progress");
      }
      setDone(true);
      startTransition(() => {
        router.refresh();
        if (nextHref) router.push(nextHref);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save progress");
    }
  }

  if (done) {
    return (
      <div className="complete-row">
        <p className="complete-row__status">Lesson saved — progress kept for your account.</p>
        {nextHref ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => router.push(nextHref)}
          >
            Next lesson
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => router.push("/courses/vfr-basics")}
          >
            Back to course
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="complete-row">
      <button
        type="button"
        className="btn btn--primary"
        disabled={isPending}
        onClick={onComplete}
      >
        {isPending ? "Saving…" : "Mark complete & save progress"}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
