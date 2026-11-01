import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {cache} from 'react';

import type {Document} from '@contentful/rich-text-types';

import {getClient, isModelDanychTitle} from '@/lib/cms';
import {renderRichText} from '@/lib/rich-text';

// Fields we read off each `offerPageSubpage` entry.
// `leadTextLong` is the fallback lead when the shorter `leadText` is empty.
// `metaTitle` / `metaDescription` are optional SEO overrides; `metaTitle` is
// not in the content model yet.
interface OfferSubpageFields {
  title: string;
  slug: string;
  leadText?: string;
  leadTextLong?: string;
  metaTitle?: string;
  metaDescription?: string;
  body: Document;
}

async function getOfferSubpages() {
  const res = await getClient().getEntries({content_type: 'offerPageSubpage'});
  return res.items
    .map((entry) => entry.fields as unknown as OfferSubpageFields)
    .filter((fields) => !isModelDanychTitle(fields.title));
}

// Cached so generateMetadata and the page share one fetch per request.
const getOfferSubpage = cache(async (slug: string) => {
  const res = await getClient().getEntries({
    content_type: 'offerPageSubpage',
    'fields.slug': slug,
    limit: 1,
  });
  const fields = res.items[0]?.fields as unknown as
    | OfferSubpageFields
    | undefined;
  if (!fields || isModelDanychTitle(fields.title)) return undefined;
  return fields;
});

type Props = {params: Promise<{slug: string}>};

export async function generateStaticParams() {
  const subpages = await getOfferSubpages();
  return subpages.map((page) => ({slug: page.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const page = await getOfferSubpage(slug);
  if (!page) return {};

  const title = page.metaTitle || `${page.title} — Natal Instalacje`;
  const description =
    page.metaDescription || page.leadText || page.leadTextLong;

  // TODO: add canonical + og:url once a shared site-origin helper exists.
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'pl_PL',
      type: 'website',
    },
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
        <article>{renderRichText(pageContent.body)}</article>
      </div>
    </>
  );
}
