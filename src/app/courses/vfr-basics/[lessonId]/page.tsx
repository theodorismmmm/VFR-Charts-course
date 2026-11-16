import { requireUser } from "@/lib/auth-guard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteLessonButton } from "@/components/complete-lesson-button";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { getLesson, VFR_BASICS_COURSE_ID } from "@/lib/courses";
import { getCourseProgress } from "@/lib/progress";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function LessonPage({ params }: PageProps) {
  const userId = await requireUser();
  const { lessonId } = await params;
  const found = getLesson(VFR_BASICS_COURSE_ID, lessonId);
  if (!found) notFound();

  const { course, lesson, index } = found;
  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];

  const progress = await getCourseProgress(userId, course.id);
  const completed = progress.some((p) => p.lesson_id === lesson.id && p.completed);

  return (
    <div className="page-shell">
      <p className="section__eyebrow">
        <Link href="/courses/vfr-basics">{course.title}</Link>
        {" · "}
        Lesson {lesson.order} of {course.lessons.length}
      </p>

      <div className="lesson-layout">
        <figure className="lesson-hero-img">
          <Image
            src={lesson.image.src}
            alt={lesson.image.alt}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 60vw"
            style={{ objectFit: "cover" }}
          />
          <figcaption>
            {lesson.airport.name} ({lesson.airport.code}) — {lesson.image.credit}
          </figcaption>
        </figure>

        <article className="lesson-panel">
          <DifficultyBadge level={lesson.difficulty} />
          <h1>{lesson.title}</h1>
          <p className="lede">{lesson.summary}</p>

          <div className="airport-chip">
            <strong>{lesson.airport.code}</strong>
            <span>{lesson.airport.name}</span>
            <span style={{ color: "var(--muted)" }}>{lesson.airport.note}</span>
          </div>

          <div className="lesson-copy">
            {lesson.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <div className="takeaways">
            <h3>Takeaways</h3>
            <ul>
              {lesson.takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <CompleteLessonButton
            courseId={course.id}
            lessonId={lesson.id}
            completed={completed}
            nextHref={next ? `/courses/vfr-basics/${next.id}` : undefined}
          />

          <div className="lesson-nav">
            {prev ? (
              <Link href={`/courses/vfr-basics/${prev.id}`} className="btn btn--ghost">
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/courses/vfr-basics/${next.id}`} className="btn btn--ghost">
                {next.title} →
              </Link>
            ) : (
              <Link href="/courses/vfr-basics" className="btn btn--ghost">
                Course overview
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
