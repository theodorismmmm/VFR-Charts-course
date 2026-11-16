import { auth } from "@clerk/nextjs/server";
import { getCourse } from "@/lib/courses";
import { getCourseProgress, markLessonComplete } from "@/lib/progress";

async function currentUserId() {
  if (
    process.env.DEMO_PREVIEW === "1" &&
    process.env.NODE_ENV !== "production"
  ) {
    return "user_demo_preview";
  }
  const { userId } = await auth();
  return userId;
}

export async function GET(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  if (!courseId || !getCourse(courseId)) {
    return Response.json({ error: "Unknown course" }, { status: 400 });
  }

  const progress = await getCourseProgress(userId, courseId);
  return Response.json({ progress });
}

export async function POST(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    courseId?: string;
    lessonId?: string;
  } | null;

  const courseId = body?.courseId;
  const lessonId = body?.lessonId;
  const course = courseId ? getCourse(courseId) : undefined;
  const lesson = course?.lessons.find((l) => l.id === lessonId);

  if (!course || !lesson) {
    return Response.json({ error: "Unknown lesson" }, { status: 400 });
  }

  await markLessonComplete(userId, course.id, lesson.id);
  const progress = await getCourseProgress(userId, course.id);
  return Response.json({ ok: true, progress });
}
