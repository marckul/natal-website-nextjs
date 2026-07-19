// Hand-typed Contentful entry interfaces.
//
// Field names mirror the Contentful content model 1:1 — do not rename them;
// the editorial workflow depends on these exact keys. Rich-text `body` fields
// are typed as `unknown` for now; the proper `Document` type arrives with
// `@contentful/rich-text-types` when the SDK is installed in a later phase.

/** `stronaOfertyPodstrona` — offer subpages (`/oferta/[slug]`). */
export interface StronaOfertyPodstronaFields {
  title: string;
  slug: string;
  leadText: string;
  leadTextLong: string;
  body: unknown;
}

/** `aktualnosciPost` — news posts (`/aktualnosci/[date]/[slug]`). */
export interface AktualnosciPostFields {
  title: string;
  publishDate: string;
  intercept: string;
  body: unknown;
}

/** `metadaneStrony` — per-page SEO metadata. */
export interface MetadaneStronyFields {
  isForPage: string;
  title: string;
  description: string;
  keywords: string[];
  url: string;
}
