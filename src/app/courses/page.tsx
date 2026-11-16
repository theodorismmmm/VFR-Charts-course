import Image from "next/image";
import Link from "next/link";
import { ProgressBar } from "@/components/progress-bar";
import { requireUser } from "@/lib/auth-guard";
import { courses } from "@/lib/courses";
import { getCourseProgress } from "@/lib/progress";

export default async function CoursesPage() {
  const userId = await requireUser();

  const courseCards = await Promise.all(
    courses.map(async (course) => {
      const progress = await getCourseProgress(userId, course.id);
      const completed = progress.filter((p) => p.completed).length;
      return { course, completed };
    }),
  );

  return (
    <div className="page-shell">
      <div className="page-heading">
        <h1>Courses</h1>
        <p>
          Your available Aviation North courses. Progress is saved when you mark
          each lesson complete.
        </p>
      </div>

      <div className="course-list">
        {courseCards.map(({ course, completed }) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="course-link"
          >
            <div className="course-link__media">
              <Image
                src={course.coverImage}
                alt=""
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="course-link__body">
              <h2>{course.title}</h2>
              <p>{course.tagline}</p>
              <p>{course.description}</p>
              <ProgressBar
                completed={completed}
                total={course.lessons.length}
                label={`${course.title} progress`}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
