import {createClient} from 'contentful';

// Shared Contentful Delivery client for all server-side content queries.
// Reads credentials from env; an empty `host` falls back to the SDK default
// (cdn.contentful.com).
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  host: process.env.CONTENTFUL_HOST || '',
});
