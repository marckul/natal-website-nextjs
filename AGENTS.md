<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## What this project is

A small Polish-language marketing website for **Natal Instalacje**. The site is a rewrite of an older Gatsby 3 codebase. Domain-specific context (services, locale specifics, content guidelines) is provided separately at project setup and recalled via your memory system.

## Stack

- **Next.js 15** with **App Router** and **React Server Components** (default; mark client components explicitly)
- **TypeScript** with `strict: true`
- **Styling — current phase: Bootstrap 5 CSS only** (no Bootstrap JS). This is a deliberate first-migration choice — we keep the predecessor site's design intact while changing the framework, then swap to Tailwind in a separate later phase. Bootstrap CSS classes (`container`, `row`, `col-*`, `card`, `btn`, `display-*`, `lead`) are used directly in JSX. Bootstrap's interactive JS components (carousel, navbar collapse, dropdown) are rebuilt as React components — never import `bootstrap/dist/js/*`.
- **Styling — future phase (Phase 7+): Tailwind + selective shadcn/ui.** When that migration begins, this CLAUDE.md must be updated to reflect the new styling system.
- **Contentful** as headless CMS (kept from the predecessor site — same space, same content model). Fetched server-side in RSCs via the official `contentful` SDK.
- **next/image** for all images
- **Vercel** deployment with **ISR**; Contentful webhook hits `/api/revalidate` on publish
- **npm** as the package manager (commit `package-lock.json`; never commit `pnpm-lock.yaml` or `yarn.lock`)

## Content model (Contentful)

The Contentful content types are inherited from the predecessor site. Do not rename fields. Key types:

- `stronaOfertyPodstrona` — offer subpages (`title`, `slug`, `leadText`, `leadTextLong`, `body` rich text)
- `aktualnosciPost` — news posts (`title`, `publishDate`, body)
- `metadaneStrony` — per-page SEO metadata (`isForPage`, `title`, `description`, `keywords`, `url`)

Use `contentful-typescript-codegen` or hand-typed interfaces in `lib/contentful-types.ts`. Do not use `any`.

## Routing

| Route                        | Source                                                                  |
| ---------------------------- | ----------------------------------------------------------------------- |
| `/`                          | static, `app/page.tsx`                                                  |
| `/oferta`                    | static, `app/oferta/page.tsx`                                           |
| `/oferta/[slug]`             | static via `generateStaticParams`, sourced from `stronaOfertyPodstrona` |
| `/aktualnosci`               | static, `app/aktualnosci/page.tsx`                                      |
| `/aktualnosci/[date]/[slug]` | static via `generateStaticParams`, sourced from `aktualnosciPost`       |
| `/regulamin-strony`          | static, `app/regulamin-strony/page.tsx`                                 |

URLs **must remain identical** to the predecessor site so existing Google rankings transfer. Any slug change requires a 301 redirect in `next.config.ts`.

## Critical conventions

- **No jQuery**, **no Bootstrap JS bundle**, **no `useEffect` for data fetching**. Bootstrap 5 CSS classes are fine; Bootstrap 5 JS is not. Server components fetch directly.
- **Polish locale**: `<html lang="pl">`. Date formatting via `Intl.DateTimeFormat('pl-PL')`. Slug normalization replaces Polish diacritics (`ą → a`, `ć → c`, `ę → e`, `ł → l`, `ń → n`, `ó → o`, `ś → s`, `ź / ż → z`).
- **SEO on every page**: every route exports `metadata` or `generateMetadata`. Service subpages include a `LocalBusiness` JSON-LD block.
- **Accessibility**: semantic HTML, descriptive Polish `alt` text (never `"image mockup"`), focus states, keyboard nav. Run `npx @axe-core/cli` before considering a page done.
- **Performance**: Lighthouse score target ≥ 95 on each page in production builds. Use `next/image` with explicit `width`/`height`, lazy-load below the fold.
- **Commits**: Clear, descriptive English messages. No specific convention required (no Conventional Commits, no scope prefixes). Atomic commits — one logical change per commit.

## Environment variables

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=          # Delivery API token (production builds)
CONTENTFUL_PREVIEW_TOKEN=         # Preview API token (draft mode locally)
CONTENTFUL_REVALIDATE_SECRET=     # Shared with the Contentful webhook
```

Commit a `.env.example`; never commit real values.

## What lives where

```
app/                  Routes (RSC by default)
components/           Reusable UI (PascalCase files)
components/ui/        shadcn primitives (added later, in the styling-migration phase)
lib/                  contentful client, helpers, types
public/               Static assets
styles/               SCSS partials (_variables, _layout, _carousel-hero, _index-page, _experimental)
```

## Out of scope (do not add unless asked)

- i18n / multilingual (site is Polish only)
- Authentication / user accounts
- Database, Prisma, custom backend (Contentful is the data layer)
- Storybook
- Redux / Zustand / global state (a marketing site has no global state)
- Contact form (optional later addition — not in this migration)

## When in doubt

1. Recall the project context from your memory system (saved at project setup).
2. When porting content or layout, read the original predecessor file as ground truth (path is in memory) before writing the new one.
3. Ask before paraphrasing or restructuring Polish copy — the client has approved the existing wording.
