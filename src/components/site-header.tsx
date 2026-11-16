"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        <span className="brand-mark__glyph" aria-hidden />
        <span className="brand-mark__text">
          Aviation <em>North</em>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        <Suspense fallback={null}>
          <Show when="signed-in">
            <Link href="/courses">Courses</Link>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button type="button" className="btn btn--ghost">
                Log in
              </button>
            </SignInButton>
            <Link href="/sign-up" className="btn btn--primary">
              Start learning
            </Link>
          </Show>
        </Suspense>
      </nav>
    </header>
  );
}
