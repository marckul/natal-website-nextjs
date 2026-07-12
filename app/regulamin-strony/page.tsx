import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import type {Document} from '@contentful/rich-text-types';

import GoBackLink from '@/components/GoBackLink';
import {getClient} from '@/lib/contentful';
import {renderRichText} from '@/lib/rich-text';

interface PrivacyPolicyFields {
  title?: string;
  body?: Document;
}

async function getPrivacyPolicy() {
  const res = await getClient().getEntries({
    content_type: 'privacyPolicy',
    limit: 1,
  });
  return res.items[0]?.fields as PrivacyPolicyFields | undefined;
}

export const metadata: Metadata = {
  title: 'Regulamin strony — Natal Instalacje',
  description: 'Regulamin strony internetowej Natal Instalacje.',
};

export default async function RegulaminStronyPage() {
  const pageContent = await getPrivacyPolicy();
  if (!pageContent) notFound();

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
          {pageContent.body && renderRichText(pageContent.body)}
        </article>
      </div>
    </>
  );
}
