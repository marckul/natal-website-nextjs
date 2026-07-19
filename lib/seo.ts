import type {Metadata} from 'next';

import {getClient} from '@/lib/contentful';

// Routes that have their own `siteMetadata` entry, mapped to that entry's
// `isForPage` value and the path appended to the CMS domain for the canonical
// URL. `/oferta/[slug]`, `/aktualnosci/[date]/[slug]` and `/regulamin-strony`
// have no entry — they derive metadata from their own content instead.
const metaPagesByRoute = {
  '/': {targetPage: 'Cala witryna', path: ''},
  '/oferta': {targetPage: 'Strona Oferty', path: '/oferta'},
  '/aktualnosci': {targetPage: 'Strona Aktualnosci', path: '/aktualnosci'},
} as const;

type MetaRoute = keyof typeof metaPagesByRoute;

// Fields we read off a `siteMetadata` entry (SEO metadata per page).
interface SiteMetadataFields {
  isForPage?: string;
  title: string;
  url: string;
  description: string;
  keywords: string[];
}

async function getSiteMetadata(targetPage: string) {
  const res = await getClient().getEntries({
    content_type: 'siteMetadata',
    'fields.isForPage': targetPage,
    limit: 1,
  });
  return res.items[0]?.fields as unknown as SiteMetadataFields | undefined;
}

/**
 * Builds a route's page metadata from its `siteMetadata` entry — title,
 * description, keywords, canonical URL and Open Graph tags. Returns an empty
 * object when the entry is missing, so the page falls back to layout defaults.
 */
export async function buildPageMetadata(route: MetaRoute): Promise<Metadata> {
  const {targetPage, path} = metaPagesByRoute[route];
  const meta = await getSiteMetadata(targetPage);
  if (!meta) return {};

  // The CMS `url` field holds a bare domain and is inconsistent about the
  // scheme, so strip a trailing slash and force https for a valid canonical.
  const rawOrigin = meta.url.replace(/\/$/, '');
  const origin = rawOrigin.startsWith('http')
    ? rawOrigin
    : `https://${rawOrigin}`;
  const pageUrl = `${origin}${path}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {canonical: pageUrl},
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      locale: 'pl_PL',
      type: 'website',
    },
  };
}
