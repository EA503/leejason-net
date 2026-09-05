# leejason.net

Personal site for Jason Lee — Concierge Business Advisor at CBA Lifestyle and host of
*The Living Question*. Next.js 16 (App Router) with Sanity as the CMS, deployed on Vercel.

## Running locally

```bash
npm install
npm run dev
```

The site runs with **no configuration at all**. Until Sanity is connected it renders the
placeholder copy from the approved prototype (`src/content/fallback.ts`), so the design is
always viewable and the build never breaks on missing credentials.

## What Jason can edit, and where

Everything editable lives at **`/studio`** (`leejason.net/studio` in production). The
sidebar shows exactly seven things and nothing else:

| In the Studio | What it controls |
| --- | --- |
| Hero & Bio | Intro paragraph, short bio, photo of Jason, SEO description |
| CBA Lifestyle description | The dark "About" section |
| Contact info | Name, public email, booking link |
| Links | Apple Podcasts, Amazon Music, podcast site, LinkedIn, Instagram, CBA |
| Podcast episodes | Guest, title, date, optional link — add new ones freely |
| Moments photos | The photo grid, any number of photos |
| Guest applications | Read-only inbox of form submissions |

Everything else — section headings, the "Two ways he shows up" copy, the podcast pull
quote, nav labels — is hardcoded in the components, by design.

Two behaviours worth knowing:

- **Blank fields fall back rather than break.** An empty bio renders the prototype copy,
  not an empty section.
- **Blank links disappear rather than dangle.** An unset Instagram URL hides the link
  instead of rendering a dead `#`.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you have. Each block is independent —
partial configuration works.

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Turns on live content and the Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Defaults to `production` |
| `SANITY_API_READ_TOKEN` | Reading content |
| `SANITY_API_WRITE_TOKEN` | Saving guest applications |
| `SANITY_REVALIDATE_SECRET` | The publish-to-live webhook |
| `RESEND_API_KEY`, `GUEST_APPLICATION_TO_EMAIL` | Emailing guest applications |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, OG tags, sitemap |

### Instant publishing

The homepage is static and revalidated on demand. In sanity.io/manage → API → Webhooks:

- **URL** `https://leejason.net/api/revalidate`
- **Trigger on** create, update, delete
- **Secret** the same value as `SANITY_REVALIDATE_SECRET`

Without the webhook content still refreshes, just on an hourly cycle instead of instantly.

## Where this folder lives

This project sits inside `~/Desktop/Claude Code 1/`, which is itself the working
tree of a *different* repo (Pulse-Desk-). That is intentional, for folder
organisation, and it is safe because this directory has its own `.git` and is
listed in the parent repo's `.gitignore` — the parent cannot see or stage it,
even under `git add -A`.

One caveat: `git clean -xffd` (double `-f`) run in the parent **would** delete
this directory. Plain `git clean -xfd` will not, because git refuses to recurse
into a nested repository. Everything here is pushed to GitHub, but uncommitted
work and `.env.local` would be lost.

## Deploying

Pushes to `main` deploy automatically through the Vercel Git integration.

One gotcha worth knowing: **Vercel only builds commits whose author belongs to
the Vercel team.** A commit from an outside author still creates a deployment,
but it never builds — it sits with no logs and no duration, and cannot be
redeployed. If a push seems to do nothing, check `git config user.email` before
looking anywhere else.

## Layout

```
src/
├── app/            routes, metadata, OG image, /studio, /api
├── components/     one folder per section: .tsx + .module.css
├── content/        fallback copy from the prototype
└── sanity/         client, image builder, GROQ queries, schemas
```

`prototype-reference.html` is the original approved prototype, kept for design reference.
The CSS in `globals.css` and the component modules is ported from it verbatim; verified
against it with a computed-style diff (grids, section padding and colors match exactly).
