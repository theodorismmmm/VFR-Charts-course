import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const demoPreview =
  process.env.DEMO_PREVIEW === "1" && process.env.NODE_ENV !== "production";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Aviation North — Learn VFR Charts",
    template: "%s · Aviation North",
  },
  description:
    "Aviation North teaches VFR charts from scratch with real airport imagery, step-by-step lessons, and saved progress.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const shell = (
    <>
      {demoPreview ? (
        <header className="site-header">
          <Link href="/courses/vfr-basics" className="brand-mark">
            <span className="brand-mark__glyph" aria-hidden />
            <span className="brand-mark__text">
              Aviation <em>North</em>
            </span>
          </Link>
        </header>
      ) : (
        <SiteHeader />
      )}
      <main className="flex-1">{children}</main>
      <footer className="footer-note">
        Aviation North · VFR education with real airport photographs and public-domain FAA chart excerpts.
      </footer>
    </>
  );

  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {demoPreview ? shell : <ClerkProvider>{shell}</ClerkProvider>}
      </body>
    </html>
  );
}
