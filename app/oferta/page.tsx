import type {Metadata} from 'next';
import Link from 'next/link';
import {createClient} from 'contentful';
import {BLOCKS, INLINES, type Document} from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  type Options,
} from '@contentful/rich-text-react-renderer';

import Row from '@/components/Row';
import {offerSubpages} from '@/lib/mock-oferta';

const options: Options = {
  renderNode: {
    // SPRZEDAŻ / WYKONAWSTWO-USŁUGI column headings → big uppercase display-4.
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="display-4">{children}</h2>
    ),
    // Offer-column links point to offer subpages — always under /oferta/<slug>,
    // matching the predecessor site. Entries without a slug (e.g. section
    // anchors) render as plain text for now. The SDK types `node.data.target`
    // loosely, so we narrow to just the `slug` we read.
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      const target = node.data.target as {fields?: {slug?: string}};
      const slug = target.fields?.slug;
      if (!slug) return <>{children}</>;
      return <Link href={`/oferta/${slug}`}>{children}</Link>;
    },
  },
};

// Fields we read off the `offerPageOurOffer` entry. Names mirror Contentful 1:1;
// the two columns are rich-text `Document`s. Loose cast for now.
interface OfferPageFields {
  title?: string;
  leadText?: string;
  bodyCol1?: Document;
  bodyCol2?: Document;
}

export async function getOfferPageOurOffer() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    host: process.env.CONTENTFUL_HOST || '',
  });

  const res = await client.getEntries({content_type: 'offerPageOurOffer'});

  // Skip the old "MODEL_DANYCH" template entry; return the two rich-text columns
  // (SPRZEDAŻ / WYKONAWSTWO-USŁUGI) from the real entry. Loose cast for now.
  const ourOffer = res.items.find(
    (item) => item.fields.title !== 'MODEL_DANYCH'
  );
  return ourOffer?.fields as OfferPageFields | undefined;
}

export const metadata: Metadata = {
  title: 'Oferta — Natal Instalacje',
  description:
    'Oferta firmy Natal Instalacje: centralne ogrzewanie, instalacje gazowe, WOD-KAN, fotowoltaika, wentylacja.',
};

export default async function OfertaPage() {
  const fields = await getOfferPageOurOffer();
  console.log(fields);

  return (
    <>
      <section id="nasza-oferta">
        <div className="main-offer-jumbotron">
          <div className="container">
            <div className="col-md-8">
              <h1 className="display-2 fw-normal">{fields?.title}</h1>
              <p className="lead fw-normal">{fields?.leadText}</p>
            </div>
          </div>
        </div>

        <div className="offer-section-body">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-md flex-grow-1">
                {fields?.bodyCol1 &&
                  documentToReactComponents(fields.bodyCol1, options)}
              </div>
              <div className="col-md flex-grow-1">
                {fields?.bodyCol2 &&
                  documentToReactComponents(fields.bodyCol2, options)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-5 my-5">
        <Row justifyContent="around">
          <ul>
            {offerSubpages.map((page) => (
              <li key={page.slug}>
                <Link href={`/oferta/${page.slug}`}>
                  {`/oferta/${page.slug}`}
                </Link>
              </li>
            ))}
          </ul>
        </Row>
      </section>
    </>
  );
}
