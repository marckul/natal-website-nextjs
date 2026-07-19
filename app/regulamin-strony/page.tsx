import type {Metadata} from 'next';
import GoBackLink from '@/components/GoBackLink';

export const metadata: Metadata = {
  title: 'Regulamin strony — Natal Instalacje',
  description: 'Regulamin strony internetowej Natal Instalacje.',
};

// Body is the Contentful `regulaminPortalu` rich text on the predecessor site;
// rendered here as a Lorem placeholder until the Contentful phase wires up the
// live query (same mock convention as /oferta/[slug] and the news posts).
const loremBody: string[] = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

export default function RegulaminStronyPage() {
  return (
    <>
      <section className="jumbotron-hero">
        <div className="container">
          <h1 className="display-2">Regulamin Strony</h1>
        </div>
      </section>

      <div className="container py-5">
        <nav>
          <GoBackLink />
        </nav>
        <article>
          {loremBody.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </article>
      </div>
    </>
  );
}
