import type {Metadata} from 'next';
import Link from 'next/link';
import {formatDatePL} from '@/lib/dates';
import {getPostsSorted} from '@/lib/mock-aktualnosci';

export const metadata: Metadata = {
  title: 'Aktualności — Natal Instalacje',
  description: 'Aktualności i nowości firmy Natal Instalacje z Rybnika.',
};

export default function AktualnosciPage() {
  const posts = getPostsSorted();

  return (
    <>
      <section className="jumbotron-hero">
        <div className="container">
          <h1 className="display-2">Aktualności</h1>
        </div>
      </section>

      <div className="container py-5">
        {posts.map((post) => (
          <article key={post.slug} className="row my-5 py-3">
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
