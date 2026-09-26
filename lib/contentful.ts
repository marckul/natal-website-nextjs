import {createClient} from 'contentful';

// Single Contentful client. `.env` picks Delivery (published, default host) vs
// Preview (drafts): set CONTENTFUL_HOST=preview.contentful.com + a Preview token.

const MODEL_DANYCH_TITLE = 'MODEL_DANYCH';

type ContentfulClient = ReturnType<typeof createClient>;

let client: ContentfulClient | undefined;

/**
 * Checks whether `title` is the dummy CMS template entry (`MODEL_DANYCH`).
 * Those entries must never be listed or reachable by URL.
 */
export function isModelDanychTitle(title: string | undefined): boolean {
  return title === MODEL_DANYCH_TITLE;
}

/** Returns the shared Contentful client, created on first fetch */
export function getClient(): ContentfulClient {
  if (!client) {
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
      host: process.env.CONTENTFUL_HOST || '',
    });
  }
  return client;
}
