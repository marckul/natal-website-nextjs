import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import GoBackLink from '@/components/GoBackLink';
import {formatDatePL} from '@/lib/dates';
import {getPost, posts} from '@/lib/mock-aktualnosci';

type Props = {params: Promise<{date: string; slug: string}>};

export async function generateStaticParams() {
  return posts.map((post) => ({date: post.publishDate, slug: post.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {date, slug} = await params;
  const post = getPost(date, slug);
  if (!post) return {};
  return {
    title: `${post.title} — Natal Instalacje`,
    description: post.intercept,
  };
}

export default async function AktualnosciPostPage({params}: Props) {
  const {date, slug} = await params;
  const post = getPost(date, slug);
  if (!post) notFound();

  const paragraphs = post.body as string[];

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
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </article>
    </div>
  );
}
