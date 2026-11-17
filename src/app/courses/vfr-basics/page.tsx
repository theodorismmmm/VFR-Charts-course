import { requireUser } from "@/lib/auth-guard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { getCourse, VFR_BASICS_COURSE_ID } from "@/lib/courses";
import { flights } from "@/lib/flights";
import { getCourseProgress } from "@/lib/progress";

export default async function VfrBasicsPage() {
  const userId = await requireUser();
  const course = getCourse(VFR_BASICS_COURSE_ID);
  if (!course) notFound();

  const progress = await getCourseProgress(userId, course.id);
  const completedSet = new Set(
    progress.filter((p) => p.completed).map((p) => p.lesson_id),
  );
  const completedCount = completedSet.size;

  const nextLesson =
    course.lessons.find((l) => !completedSet.has(l.id)) ?? course.lessons[0];

  return (
    <div className="page-shell">
      <div className="page-heading">
        <p className="section__eyebrow">Course</p>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <ProgressBar
          completed={completedCount}
          total={course.lessons.length}
          label="VFR Basics progress"
        />
        <div style={{ marginTop: "1.25rem" }}>
          <Link
            href={`/courses/vfr-basics/${nextLesson.id}`}
            className="btn btn--primary"
          >
            {completedCount === 0 ? "Start course" : "Continue"}
          </Link>
        </div>
      </div>

      <div
        className="lesson-hero-img"
        style={{ marginBottom: "1.5rem", maxHeight: 320 }}
      >
        <Image
          src={course.coverImage}
          alt="FAA Anchorage sectional chart excerpt"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        <figcaption>
          Cover chart: FAA Anchorage Sectional excerpt (public domain)
        </figcaption>
      </div>

      <section className="fly-band">
        <div>
          <h2>Fly the chart</h2>
          <p>
            The lessons teach the picture. The flights are where you use it: tap the next call, and Medium or Hard
            ATC changes the plan at the last second. Each tap teaches the symbol under it.
          </p>
        </div>
        <Link href="/courses/vfr-basics/fly" className="btn btn--primary">
          Open the {flights.length} flights
        </Link>
      </section>

      <div className="lesson-list">
        {course.lessons.map((lesson) => {
          const done = completedSet.has(lesson.id);
          return (
            <Link
              key={lesson.id}
              href={`/courses/vfr-basics/${lesson.id}`}
              className="lesson-row"
              style={{ animationDelay: `${lesson.order * 30}ms` }}
            >
              <span className="lesson-row__index">
                {String(lesson.order).padStart(2, "0")}
              </span>
              <div>
                <p className="lesson-row__title">{lesson.title}</p>
                <p className="lesson-row__meta">
                  {lesson.airport.code} · {lesson.airport.name} ·{" "}
                  {lesson.readingMinutes} min
                </p>
              </div>
              <div className="lesson-row__right">
                <DifficultyBadge level={lesson.difficulty} />
                {done ? <span className="lesson-row__check">Completed</span> : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
