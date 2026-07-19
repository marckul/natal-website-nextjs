import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getOfferSubpage, offerSubpages} from '@/lib/mock-oferta';

type Props = {params: Promise<{slug: string}>};

export async function generateStaticParams() {
  return offerSubpages.map((page) => ({slug: page.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const page = getOfferSubpage(slug);
  if (!page) return {};
  return {
    title: `${page.title} — Natal Instalacje`,
    description: page.leadText,
  };
}

export default async function OfertaPodstronaPage({params}: Props) {
  const {slug} = await params;
  const page = getOfferSubpage(slug);
  if (!page) notFound();

  const paragraphs = page.body as string[];

  return (
    <>
      <section className="offer-subpage-jumbotron">
        <div className="container py-5 my-5">
          <h1 className="display-1">{page.title}</h1>
          {page.leadText ? (
            <p className="lead fw-normal">{page.leadText}</p>
          ) : null}
        </div>
      </section>

      <div className="container my-5 py-5">
        <article>
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </article>
      </div>
    </>
  );
}
