import { Show, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const demoPreview =
  process.env.DEMO_PREVIEW === "1" && process.env.NODE_ENV !== "production";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__media" aria-hidden>
          <Image
            src="/airports/00-hero-augsburg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero__shade" />
        </div>
        <div className="hero__content">
          <h1 className="hero__brand">
            Aviation
            <span>North</span>
          </h1>
          <p className="hero__lede">
            Learn VFR charts from scratch—runways, symbols, and airspace—using real
            airport photos that grow from easy fields to hard hubs.
          </p>
          <div className="hero__actions">
            {demoPreview ? (
              <>
                <Link href="/courses" className="btn btn--primary">
                  Open courses
                </Link>
                <Link href="/courses/vfr-basics" className="btn btn--ghost">
                  Continue VFR Basics
                </Link>
              </>
            ) : (
              <Suspense fallback={<Link href="/sign-in" className="btn btn--primary">Log in</Link>}>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button type="button" className="btn btn--primary">
                      Log in to view courses
                    </button>
                  </SignInButton>
                  <Link href="/sign-up" className="btn btn--ghost">
                    Create account
                  </Link>
                </Show>
                <Show when="signed-in">
                  <Link href="/courses" className="btn btn--primary">
                    Open courses
                  </Link>
                  <Link href="/courses/vfr-basics" className="btn btn--ghost">
                    Continue VFR Basics
                  </Link>
                </Show>
              </Suspense>
            )}
          </div>
        </div>
      </section>

      <section className="section section--narrow">
        <p className="section__eyebrow">Built for new VFR pilots</p>
        <h2 className="section__title">One course. Real airports. Saved progress.</h2>
        <p className="section__copy">
          After you log in with Clerk, you will see available courses. Start with
          VFR Basics and move lesson by lesson—from a quiet GA ramp to sectional
          charts over complex terminal airspace.
        </p>
        <div className="feature-strip">
          <div>
            <h3>Easy → hard imagery</h3>
            <p>Cambridge and Salzburg first; Sydney, Haneda, and Schiphol when you are ready.</p>
          </div>
          <div>
            <h3>Chart literacy</h3>
            <p>
              Marked photos and a training sectional, then flights where you tap the next call. Basic gives the plan.
              Medium and Hard amend it at the last second, and each tap teaches the symbol.
            </p>
          </div>
          <div>
            <h3>Progress that sticks</h3>
            <p>Mark lessons complete and return later—your place is stored to your account.</p>
          </div>
        </div>
      </section>
    </>
  );
}
