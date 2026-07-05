import type {Metadata} from 'next';
import Link from 'next/link';
import {BLOCKS, INLINES, type Document} from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  type NodeRenderer,
  type Options,
} from '@contentful/rich-text-react-renderer';
import {client} from '@/lib/contentful';

const MODEL_DANYCH = 'MODEL_DANYCH';

// For now, offer links always point to offer subpages under /oferta/<slug>
const renderOfferLink: NodeRenderer = (node, children) => {
  const target = node.data.target as {fields?: {slug?: string}};
  const slug = target.fields?.slug;
  if (!slug) return <>{children}</>;
  return <Link href={`/oferta/${slug}`}>{children}</Link>;
};

// "Nasza oferta" two columns: SPRZEDAŻ / WYKONAWSTWO-USŁUGI headings render as
// big uppercase display-4.
const columnOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="display-4">{children}</h2>
    ),
    [INLINES.ENTRY_HYPERLINK]: renderOfferLink,
  },
};

// Offer-section body: default headings, an inline image, and offer links.
const sectionOptions: Options = {
  renderNode: {
    // Embedded image → plain <img> for now (next/image swap is a follow-up that
    // needs images.ctfassets.net in next.config.ts remotePatterns). Contentful
    // asset URLs are protocol-relative, so we prefix `https:`.
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data.target as {
        fields?: {title?: string; description?: string; file?: {url?: string}};
      };
      const url = asset.fields?.file?.url;
      if (!url) return null;
      const alt = asset.fields?.description || asset.fields?.title || '';
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

// Fields we read off the `offerPageOurOffer` entry. Names mirror Contentful 1:1;
// the two columns are rich-text `Document`s. Loose cast for now.
interface OfferPageFields {
  title?: string;
  leadText?: string;
  bodyCol1?: Document;
  bodyCol2?: Document;
}

// Fields we read off each `offerPageSection` entry.
interface OfferPageSectionFields {
  title: string;
  leadText?: string;
  sectionsPosition: number;
  offerSectionBody: Document;
}

export async function getOfferPageOurOffer() {
  const res = await client.getEntries({content_type: 'offerPageOurOffer'});

  // Skip the old "MODEL_DANYCH" template entry; return the two rich-text columns
  // (SPRZEDAŻ / WYKONAWSTWO-USŁUGI) from the real entry. Loose cast for now.
  const ourOffer = res.items.find((item) => item.fields.title !== MODEL_DANYCH);
  return ourOffer?.fields as OfferPageFields | undefined;
}

async function getOfferPageSections() {
  const res = await client.getEntries({content_type: 'offerPageSection'});

  // Prepare data for display in the offer page. Carry the entry id for a stable
  // React key (section positions aren't guaranteed unique).
  return res.items
    .map((item) => ({
      id: item.sys.id,
      ...(item.fields as unknown as OfferPageSectionFields),
    }))
    .filter((section) => section.title !== MODEL_DANYCH)
    .sort((a, b) => a.sectionsPosition - b.sectionsPosition);
}

export const metadata: Metadata = {
  title: 'Oferta — Natal Instalacje',
  description:
    'Oferta firmy Natal Instalacje: centralne ogrzewanie, instalacje gazowe, WOD-KAN, fotowoltaika, wentylacja.',
};

export default async function OfertaPage() {
  const [fields, sections] = await Promise.all([
    getOfferPageOurOffer(),
    getOfferPageSections(),
  ]);

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
                  documentToReactComponents(fields.bodyCol1, columnOptions)}
              </div>
              <div className="col-md flex-grow-1">
                {fields?.bodyCol2 &&
                  documentToReactComponents(fields.bodyCol2, columnOptions)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id}>
          <div className="jumbotron-hero">
            <div className="container">
              <h1 className="display-2">{section.title}</h1>
              {section.leadText && (
                <p className="lead fw-normal">{section.leadText}</p>
              )}
            </div>
          </div>

          <div className="bg-white">
            <div className="container py-5 my-5">
              <div className="row justify-content-around">
                <div className="col-md">
                  {documentToReactComponents(
                    section.offerSectionBody,
                    sectionOptions
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
