import type {Metadata} from 'next';
import Link from 'next/link';
import {client} from '@/lib/contentful';
import {formatDatePL} from '@/lib/dates';
import {slugify} from '@/lib/slugify';

const MODEL_DANYCH = 'MODEL_DANYCH';

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
  const res = await client.getEntries({
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
    .filter((post) => post.title !== MODEL_DANYCH);
}

export const metadata: Metadata = {
  title: 'Aktualności — Natal Instalacje',
  description: 'Aktualności i nowości firmy Natal Instalacje z Rybnika.',
};

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
