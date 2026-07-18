import type {Metadata} from 'next';
import Link from 'next/link';

import {getClient, isModelDanychTitle} from '@/lib/contentful';
import {formatDatePL} from '@/lib/dates';
import {slugify} from '@/lib/slugify';

// `/aktualnosci` reads its SEO metadata from the `siteMetadata` entry whose
// `isForPage` field matches this value.
const META_TARGET_PAGE = 'Strona Aktualnosci';

// Fields we read off each `newsPost` entry for the list view. `body` (rich text)
// is only needed by the post subpage, so it's left out here.
interface NewsPostFields {
  title: string;
  publishDate: string;
  intercept: string;
}

async function getNewsPosts() {
  // Contentful sorts newest-first; the post subpage URL is
  // /aktualnosci/<publishDate>/<slug>, with the slug derived from the title.
  const res = await getClient().getEntries({
    content_type: 'newsPost',
    order: ['-fields.publishDate'],
  });

  return res.items
    .map((entry) => {
      const fields = entry.fields as unknown as NewsPostFields;
      return {
        id: entry.sys.id,
        title: fields.title,
        publishDate: fields.publishDate,
        intercept: fields.intercept,
        slug: slugify(fields.title),
      };
    })
    .filter((post) => !isModelDanychTitle(post.title));
}

// Fields we read off a `siteMetadata` entry (SEO metadata per page).
interface SiteMetadataFields {
  isForPage?: string;
  title: string;
  url: string;
  description: string;
  keywords: string[];
}

async function getSiteMetadata(targetPage: string) {
  const res = await getClient().getEntries({
    content_type: 'siteMetadata',
    'fields.isForPage': targetPage,
    limit: 1,
  });
  return res.items[0]?.fields as unknown as SiteMetadataFields | undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSiteMetadata(META_TARGET_PAGE);
  if (!meta) return {};

  // page URL for canonical + og:url. Some `siteMetadata` entries store the
  // domain without a scheme, so ensure an absolute https URL.
  const rawOrigin = meta.url.replace(/\/$/, '');
  const origin = rawOrigin.startsWith('http')
    ? rawOrigin
    : `https://${rawOrigin}`;
  const pageUrl = `${origin}/aktualnosci`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {canonical: pageUrl},
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      locale: 'pl_PL',
      type: 'website',
    },
  };
}

export default async function AktualnosciPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <section className="jumbotron-hero">
        <div className="container">
          <h1 className="display-2">Aktualności</h1>
        </div>
      </section>

      <div className="container py-5">
        {posts.map((post) => (
          <article key={post.id} className="row my-5 py-3">
            <div className="col-12">
              <h2 className="display-6 fw-normal">{post.title}</h2>
              <p className="fw-lighter text-muted">
                Opublikowano: {formatDatePL(post.publishDate)}
              </p>
              <p>{`${post.intercept}...`}</p>
              <div className="text-end">
                <Link
                  href={`/aktualnosci/${post.publishDate}/${post.slug}`}
                  className="btn rounded-0 btn-outline-info py-1 px-3 small"
                >
                  Czytaj więcej
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
