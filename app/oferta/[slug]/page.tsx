import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import {createClient} from 'contentful';
import {BLOCKS, INLINES, type Document} from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  type NodeRenderer,
  type Options,
} from '@contentful/rich-text-react-renderer';

const MODEL_DANYCH = 'MODEL_DANYCH';

// One shared Delivery client for this page's queries.
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  host: process.env.CONTENTFUL_HOST || '',
});

// Offer links always point to offer subpages under /oferta/<slug>.
const renderOfferLink: NodeRenderer = (node, children) => {
  const target = node.data.target as {fields?: {slug?: string}};
  const slug = target.fields?.slug;
  if (!slug) return <>{children}</>;
  return <Link href={`/oferta/${slug}`}>{children}</Link>;
};

// rich text renderer settings for the offer subpage body
const bodyOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data.target as {
        fields?: {title?: string; description?: string; file?: {url?: string}};
      };
      const url = asset.fields?.file?.url;
      if (!url) return null;
      const alt = asset.fields?.description || asset.fields?.title || '';

      // Contentful asset URLs are protocol-relative, so we prefix `https:`.
      return (
        <figure className="my-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https:${url}`} alt={alt} className="img-fluid" />
        </figure>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: renderOfferLink,
  },
};

// Fields we read off each `offerPageSubpage` entry.
// `leadTextLong` is the fallback lead when the shorter `leadText` is empty.
interface OfferSubpageFields {
  title: string;
  slug: string;
  leadText?: string;
  leadTextLong?: string;
  body: Document;
}

async function getOfferSubpages() {
  const res = await client.getEntries({content_type: 'offerPageSubpage'});
  return res.items
    .map((item) => item.fields as unknown as OfferSubpageFields)
    .filter((fields) => fields.title !== MODEL_DANYCH);
}

async function getOfferSubpage(slug: string) {
  const res = await client.getEntries({
    content_type: 'offerPageSubpage',
    'fields.slug': slug,
    limit: 1,
  });
  const item = res.items[0];
  return item ? (item.fields as unknown as OfferSubpageFields) : undefined;
}

type Props = {params: Promise<{slug: string}>};

export async function generateStaticParams() {
  const subpages = await getOfferSubpages();
  return subpages.map((page) => ({slug: page.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const page = await getOfferSubpage(slug);
  if (!page) return {};
  return {
    title: `${page.title} — Natal Instalacje`,
    description: page.leadText || page.leadTextLong,
  };
}

export default async function OfertaPodstronaPage({params}: Props) {
  const {slug} = await params;
  const pageContent = await getOfferSubpage(slug);
  if (!pageContent) notFound();

  const leadText = pageContent.leadText || pageContent.leadTextLong;

  return (
    <>
      <section className="offer-subpage-jumbotron">
        <div className="container py-5 my-5">
          <h1 className="display-1">{pageContent.title}</h1>
          {leadText ? <p className="lead fw-normal">{leadText}</p> : null}
        </div>
      </section>

      <div className="container my-5 py-5">
        <article>
          {documentToReactComponents(pageContent.body, bodyOptions)}
        </article>
      </div>
    </>
  );
}
