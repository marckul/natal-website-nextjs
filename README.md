# Natal Instalacje

Website for Natal Instalacje, an installation and heating company in Rybnik,
Poland. This project is a rewrite of an older Gatsby site.

## Stack

- Next.js (App Router, React Server Components)
- TypeScript
- Bootstrap 5 (CSS only) with SCSS
- Contentful as the CMS

## Development

Requires Node.js 20.9 or later. To run the project:

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the Contentful space ID and
   a Content Delivery API token. The offer pages, news posts, privacy policy
   and SEO metadata come from an existing Contentful space, so the site can't
   render them without access to it.

3. Start the dev server:

   ```bash
   npm run dev
   ```

The site runs at http://localhost:3000.

Production builds prerender the pages from Contentful at build time, so
content published in Contentful appears after the next build.
