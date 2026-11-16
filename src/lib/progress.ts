import { sql } from "@/lib/db";

export type ProgressRow = {
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
};

export async function getCourseProgress(
  userId: string,
  courseId: string,
): Promise<ProgressRow[]> {
  return sql<ProgressRow>(
    `select lesson_id, completed, completed_at::text
     from lesson_progress
     where user_id = $1 and course_id = $2`,
    [userId, courseId],
  );
}

export async function markLessonComplete(
  userId: string,
  courseId: string,
  lessonId: string,
): Promise<void> {
  await sql(
    `insert into lesson_progress (user_id, course_id, lesson_id, completed, completed_at, updated_at)
     values ($1, $2, $3, true, now(), now())
     on conflict (user_id, course_id, lesson_id)
     do update set completed = true, completed_at = coalesce(lesson_progress.completed_at, now()), updated_at = now()`,
    [userId, courseId, lessonId],
  );
}
