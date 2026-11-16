# Aviation North

Learn **VFR charts from scratch** on Aviation North. Sign in with Clerk, open the **VFR Basics** course, and work through lessons that use real airport photographs from easy general-aviation fields to complex hubs—with progress saved to your account.

## Features

- Clerk authentication (sign in / sign up)
- Courses dashboard (currently one course: **VFR Basics**)
- 13 step-by-step lessons with difficulty tags (easy → hard)
- Real airport photos and FAA sectional chart excerpts
- Lesson progress stored per user (Postgres in production, PGlite locally)

## Local development

```bash
npm install
npx -y clerk@latest init --accountless -y   # or add your Clerk keys to .env.local
npm run dev
```

Required env vars (usually written by Clerk init):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`

Optional: `DATABASE_URL` for Postgres. Without it, progress uses local PGlite.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build + migrate when `DATABASE_URL` is set
- `npm run migrate` — apply SQL migrations
