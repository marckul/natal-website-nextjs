import type {AktualnosciPostFields} from '@/lib/contentful-types';

// Throwaway mock news posts, shaped like the Contentful `aktualnosciPost`
// type plus a derived `slug`. Replaced by live
// `delivery.getEntries('aktualnosciPost')` queries in the Contentful phase.
// Titles are placeholder topics; `intercept`/`body` are Lorem placeholders.

export type MockPost = AktualnosciPostFields & {slug: string};

const loremBody: string[] = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

const loremIntercept =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

export const posts: MockPost[] = [
  {
    title: 'Nowa oferta pomp ciepła',
    slug: 'nowa-oferta-pomp-ciepla',
    publishDate: '2025-03-15',
    intercept: loremIntercept,
    body: loremBody,
  },
  {
    title: 'Montaż instalacji fotowoltaicznej',
    slug: 'montaz-instalacji-fotowoltaicznej',
    publishDate: '2025-01-20',
    intercept: loremIntercept,
    body: loremBody,
  },
  {
    title: 'Sezon grzewczy — przegląd kotłów',
    slug: 'sezon-grzewczy-przeglad-kotlow',
    publishDate: '2024-10-05',
    intercept: loremIntercept,
    body: loremBody,
  },
];

/** Posts sorted newest first, as the news list renders them. */
export function getPostsSorted(): MockPost[] {
  return [...posts].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export function getPost(date: string, slug: string): MockPost | undefined {
  return posts.find((p) => p.publishDate === date && p.slug === slug);
}
