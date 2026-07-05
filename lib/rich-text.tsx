import Link from 'next/link';
import type {ReactNode} from 'react';

import {
  documentToReactComponents,
  type RenderNode,
} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES, type Document} from '@contentful/rich-text-types';

import {slugify} from './slugify';

// Single source of truth for rendering Contentful rich-text `Document`s. Ports
// the predecessor site's renderer to the official
// `@contentful/rich-text-react-renderer`. The Contentful.js SDK (v11) resolves
// linked assets/entries inline, so we read them straight off `node.data.target`
// (loosely typed by the SDK, so we narrow to just the fields we touch).

// The SDK types `node.data.target` loosely (`fields` is `unknown`-valued), so
// each reader narrows what it uses.
interface EmbeddedAsset {
  fields?: {title?: string; description?: string; file?: {url?: string}};
}

// Maps Contentful entries linked from rich text to their on-site URLs, keyed by
// content-type id. The SDK types resolved link targets loosely, so `fields` is
// `unknown`-valued and each builder narrows the fields it reads.

interface LinkedEntry {
  sys?: {contentType?: {sys?: {id?: string}}};
  fields?: Record<string, unknown>;
}

type HrefBuilder = (entry: LinkedEntry) => string | undefined;

// content-type id → URL builder. Add a line here when a new content type becomes
// a link target from body copy.
const hrefBuildersByType: Record<string, HrefBuilder> = {
  // Offer subpages → /oferta/<slug>
  offerPageSubpage: (entry) => {
    const slug = entry.fields?.slug;
    return typeof slug === 'string' ? `/oferta/${slug}` : undefined;
  },
  // News posts → /aktualnosci/<publishDate>/<slug-from-title> (posts have no
  // slug field; the slug is derived from the title, as on the list page).
  newsPost: (entry) => {
    const publishDate = entry.fields?.publishDate;
    const title = entry.fields?.title;
    if (typeof publishDate !== 'string' || typeof title !== 'string') {
      return undefined;
    }
    return `/aktualnosci/${publishDate}/${slugify(title)}`;
  },
  // TODO: add href builders for the remaining linkable content types (e.g.
  // offerPageSection → the /oferta page / an on-page anchor). Until then, links
  // to those entries fall through to plain text.
};

/**
 * Resolves the canonical on-site URL for an entry linked from rich text, or
 * `undefined` when the entry's content type has no route here (then it renders
 * as plain text rather than a broken link). `entry` is `node.data.target`.
 */
export function resolveEntryHref(entry: LinkedEntry): string | undefined {
  const typeId = entry.sys?.contentType?.sys?.id;
  return typeId ? hrefBuildersByType[typeId]?.(entry) : undefined;
}

const baseRenderNode: RenderNode = {
  // Embedded image asset. Contentful asset URLs are protocol-relative
  // (`//images.ctfassets.net/...`), so we prefix `https:`.
  // TODO: swap plain <img> → next/image once images.ctfassets.net is added to
  // next.config.ts `images.remotePatterns`.
  [BLOCKS.EMBEDDED_ASSET]: (node) => {
    const asset = node.data.target as EmbeddedAsset;
    const assetUrl = asset.fields?.file?.url;
    if (!assetUrl) return null;
    const altText = asset.fields?.description || asset.fields?.title || '';
    return (
      <figure className="my-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https:${assetUrl}`} alt={altText} className="img-fluid" />
      </figure>
    );
  },
  // Link to a Contentful entry. resolveEntryHref maps the linked entry's content type
  // to its URL; unrecognised types render as plain text rather than a broken
  // link.
  [INLINES.ENTRY_HYPERLINK]: (node, children) => {
    const href = resolveEntryHref(node.data.target as LinkedEntry);
    if (!href) return <>{children}</>;
    return <Link href={href}>{children}</Link>;
  },
};

/**
 * Render a Contentful rich-text `Document` to React nodes. Pass
 * `renderNodeOverrides` to style specific node types per call (e.g. the offer
 * page renders its column `heading-2` nodes as Bootstrap `display-4`).
 */
export function renderRichText(
  document: Document,
  renderNodeOverrides?: RenderNode
): ReactNode {
  return documentToReactComponents(document, {
    renderNode: {...baseRenderNode, ...renderNodeOverrides},
  });
}
