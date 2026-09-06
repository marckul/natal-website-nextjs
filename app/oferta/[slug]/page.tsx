import {cache} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import type {Document} from '@contentful/rich-text-types';

import {getClient, isModelDanychTitle} from '@/lib/contentful';
import {renderRichText} from '@/lib/rich-text';

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
        <article>{renderRichText(pageContent.body)}</article>
      </div>
    </>
  );
}
