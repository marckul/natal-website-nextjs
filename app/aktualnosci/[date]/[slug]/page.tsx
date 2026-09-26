import {cache} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import type {Document} from '@contentful/rich-text-types';

import GoBackLink from '@/components/GoBackLink';
import {getClient, isModelDanychTitle} from '@/lib/contentful';
import {formatDatePL} from '@/lib/dates';
import {renderRichText} from '@/lib/rich-text';
import {slugify} from '@/lib/slugify';

/** Fields we read off each `newsPost` entry. The post has no `slug` field — the
 * URL slug is derived from the title via slugify (matching the predecessor). */
interface NewsPostFields {
  title: string;
  publishDate: string;
  intercept: string;
  body: Document;
}

async function getNewsPosts() {
  const res = await getClient().getEntries({content_type: 'newsPost'});
  return res.items
    .map((entry) => entry.fields as unknown as NewsPostFields)
    .filter((post) => !isModelDanychTitle(post.title));
}

// Cached so generateMetadata and the page share one fetch per request.
const getNewsPost = cache(async (date: string, slug: string) => {
  // No slug field in Contentful, so narrow by publishDate, then match the
  // title-derived slug.
  const res = await getClient().getEntries({
    content_type: 'newsPost',
    'fields.publishDate': date,
  });
  const posts = res.items
    .map((entry) => entry.fields as unknown as NewsPostFields)
    .filter((post) => !isModelDanychTitle(post.title));
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
        {renderRichText(post.body)}
      </article>
    </div>
  );
}
