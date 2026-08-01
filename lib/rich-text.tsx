import type {ReactNode} from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  documentToReactComponents,
  type RenderNode,
} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES, type Document} from '@contentful/rich-text-types';

import {slugify} from './slugify';

// Single source of truth for rendering Contentful rich-text `Document`s with
// `@contentful/rich-text-react-renderer`.

// The SDK types `node.data.target` loosely (`fields` is `unknown`-valued), so
// each reader narrows what it uses.
interface EmbeddedAsset {
  fields?: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
      // Present only on image assets; the Delivery API reports intrinsic dims.
      details?: {image?: {width: number; height: number}};
    };
  };
}

interface LinkedEntry {
  sys?: {contentType?: {sys?: {id?: string}}};
  fields?: Record<string, unknown>;
}

type HrefBuilder = (entry: LinkedEntry) => string | undefined;

// Maps a content-type id to a URL builder for rich-text entry links.
const hrefBuildersByType: Record<string, HrefBuilder> = {
  // Offer subpages live at /oferta/<slug>
  offerPageSubpage: (entry) => {
    const slug = entry.fields?.slug;
    return typeof slug === 'string' ? `/oferta/${slug}` : undefined;
  },
  // News posts have no slug field, so it's derived from the title as seen below
  newsPost: (entry) => {
    const publishDate = entry.fields?.publishDate;
    const title = entry.fields?.title;
    if (typeof publishDate !== 'string' || typeof title !== 'string') {
      return undefined;
    }
    return `/aktualnosci/${publishDate}/${slugify(title)}`;
  },
  // TODO: add builders for other linkable types; unmapped becomes plain text.
};

/**
 * Resolves the on-site URL for a rich-text entry link, or `undefined` when the
 * content type is unmapped. `entry` is `node.data.target`.
 */
export function resolveEntryHref(entry: LinkedEntry): string | undefined {
  const typeId = entry.sys?.contentType?.sys?.id;
  return typeId ? hrefBuildersByType[typeId]?.(entry) : undefined;
}

const baseRenderNode: RenderNode = {
  // Embedded image asset. Contentful asset URLs are protocol-relative
  // (`//images.ctfassets.net/...`), so we prefix `https:`. `img-fluid` scales
  // the image down responsively; `sizes` lets next/image pick a matching width.
  // Non-image assets (e.g. PDFs) carry no `image` details — skip them.
  [BLOCKS.EMBEDDED_ASSET]: (node) => {
    const asset = node.data.target as EmbeddedAsset;
    const file = asset.fields?.file;
    const image = file?.details?.image;
    if (!file?.url || !image) return null;

    const alt = asset.fields?.description || asset.fields?.title || '';
    return (
      <figure className="my-4">
        <Image
          src={`https:${file.url}`}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="img-fluid"
        />
      </figure>
    );
  },
  // Entry links resolve via resolveEntryHref; unmapped types render as plain
  // text rather than a broken link.
  [INLINES.ENTRY_HYPERLINK]: (node, children) => {
    const href = resolveEntryHref(node.data.target as LinkedEntry);
    if (!href) return <>{children}</>;
    return <Link href={href}>{children}</Link>;
  },
};

/**
 * Renders a Contentful rich-text `Document` to React nodes
 *
 * @param document - The Contentful rich-text `Document` to render.
 * @param renderNodeOverrides - Lookup with custom node render functions
 */
export function renderRichText(
  document: Document,
  renderNodeOverrides?: RenderNode
): ReactNode {
  return documentToReactComponents(document, {
    renderNode: {...baseRenderNode, ...renderNodeOverrides},
  });
}
