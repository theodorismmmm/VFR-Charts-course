import { auth } from "@clerk/nextjs/server";

/** Protects a page; in DEMO_PREVIEW mode returns a fixed demo user for local screenshots. */
export async function requireUser(): Promise<string> {
  if (
    process.env.DEMO_PREVIEW === "1" &&
    process.env.NODE_ENV !== "production"
  ) {
    return "user_demo_preview";
  }
  await auth.protect();
  const { userId } = await auth();
  if (!userId) {
    await auth.protect();
  }
  return userId!;
}
