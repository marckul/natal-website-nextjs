import {cache} from 'react';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {BLOCKS, INLINES, type Document} from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  type NodeRenderer,
  type Options,
} from '@contentful/rich-text-react-renderer';
import GoBackLink from '@/components/GoBackLink';
import {client} from '@/lib/contentful';
import {formatDatePL} from '@/lib/dates';
import {slugify} from '@/lib/slugify';

const MODEL_DANYCH = 'MODEL_DANYCH';

// Offer links always point to offer subpages under /oferta/<slug>.
const renderOfferLink: NodeRenderer = (node, children) => {
  const target = node.data.target as {fields?: {slug?: string}};
  const slug = target.fields?.slug;
  if (!slug) return <>{children}</>;
  return <Link href={`/oferta/${slug}`}>{children}</Link>;
};

// rich text renderer settings for the news post body
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

// Fields we read off each `newsPost` entry. The post has no `slug` field — the
// URL slug is derived from the title via slugify (matching the predecessor).
interface NewsPostFields {
  title: string;
  publishDate: string;
  intercept: string;
  body: Document;
}

async function getNewsPosts() {
  const res = await client.getEntries({content_type: 'newsPost'});
  return res.items
    .map((item) => item.fields as unknown as NewsPostFields)
    .filter((fields) => fields.title !== MODEL_DANYCH);
}

// Cached so generateMetadata and the page share one fetch per request.
const getNewsPost = cache(async (date: string, slug: string) => {
  // No slug field in Contentful, so narrow by publishDate, then match the
  // title-derived slug.
  const res = await client.getEntries({
    content_type: 'newsPost',
    'fields.publishDate': date,
  });
  const posts = res.items
    .map((entry) => entry.fields as unknown as NewsPostFields)
    .filter((post) => post.title !== MODEL_DANYCH);
  const post = posts.find((post) => slugify(post.title) === slug);
  return post;
});

type Props = {params: Promise<{date: string; slug: string}>};

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((post) => ({
    date: post.publishDate,
    slug: slugify(post.title),
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {date, slug} = await params;
  const post = await getNewsPost(date, slug);
  if (!post) return {};
  return {
    title: `${post.title} — Natal Instalacje`,
    description: post.intercept,
  };
}

export default async function AktualnosciPostPage({params}: Props) {
  const {date, slug} = await params;
  const post = await getNewsPost(date, slug);
  if (!post) notFound();

  return (
    <div className="container mt-5 py-5">
      <nav>
        <GoBackLink />
      </nav>

      <article>
        <div className="mb-5">
          <h1 className="display-3">{post.title}</h1>
          <p>Opublikowano: {formatDatePL(post.publishDate)}</p>
        </div>
        {documentToReactComponents(post.body, bodyOptions)}
      </article>
    </div>
  );
}
