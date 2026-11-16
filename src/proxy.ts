import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const demoPreview =
  process.env.DEMO_PREVIEW === "1" && process.env.NODE_ENV !== "production";

/** DEMO_PREVIEW is the local screenshot path in auth-guard. Skip Clerk when it is on. */
export default demoPreview
  ? function demoPreviewProxy() {
      return NextResponse.next();
    }
  : clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
