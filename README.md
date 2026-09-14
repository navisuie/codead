# PageMatch (MVP)

A niche "Craigslist for devs" marketplace: small businesses post landing page
projects, developers list a public profile. Both sides reach each other by
email — no bidding, payments, or messaging system in this version.

## Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run `supabase/schema.sql` — creates the
   `developers` and `job_posts` tables with row-level security policies.
3. Copy `.env.local.example` to `.env.local` and fill in your project's URL
   and anon key (Project Settings → API).
4. In Supabase Auth settings, make sure "Email" provider is enabled (it is by
   default) — developer signup uses passwordless magic-link email.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's here

- `/` — landing page with two CTAs (post a project / list yourself)
- `/jobs`, `/jobs/new` — job board, no account required to post
- `/developers`, `/developers/new` — directory; listing yourself requires a
  magic-link sign-in (`/auth/callback` handles the redirect)
- Contact info on both listing types is hidden behind a "Reveal email" click

## Deliberately not built yet

Per the phased plan: no payments/escrow, no reviews, no in-app messaging.
Deals close off-platform by email in this phase — add monetization only
after the directory has real supply/demand liquidity in this niche.
