# PageMatch (MVP)

A niche "Craigslist for devs" marketplace: small businesses post landing page
projects, developers list a public profile. Both sides reach each other by
email — no bidding, payments, or messaging system in this version.

## Setup

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

