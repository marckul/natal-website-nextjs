import type {Metadata} from 'next';
import {BLOCKS, type Document} from '@contentful/rich-text-types';
import type {RenderNode} from '@contentful/rich-text-react-renderer';
import {client} from '@/lib/contentful';
import {renderRichText} from '@/lib/rich-text';

const MODEL_DANYCH = 'MODEL_DANYCH';

// "Nasza oferta" columns: render their SPRZEDAŻ / WYKONAWSTWO-USŁUGI headings as
// big uppercase display-4.
const ourOfferColumnHeadings: RenderNode = {
  [BLOCKS.HEADING_2]: (_node, children) => (
    <h2 className="display-4">{children}</h2>
  ),
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
  const [ourOfferFields, sections] = await Promise.all([
    getOfferPageOurOffer(),
    getOfferPageSections(),
  ]);

  return (
    <>
      <section id="nasza-oferta">
        <div className="main-offer-jumbotron">
          <div className="container">
            <div className="col-md-8">
              <h1 className="display-2 fw-normal">{ourOfferFields?.title}</h1>
              <p className="lead fw-normal">{ourOfferFields?.leadText}</p>
            </div>
          </div>
        </div>

        <div className="offer-section-body">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-md flex-grow-1">
                {ourOfferFields?.bodyCol1 &&
                  renderRichText(
                    ourOfferFields.bodyCol1,
                    ourOfferColumnHeadings
                  )}
              </div>
              <div className="col-md flex-grow-1">
                {ourOfferFields?.bodyCol2 &&
                  renderRichText(
                    ourOfferFields.bodyCol2,
                    ourOfferColumnHeadings
                  )}
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
                  {renderRichText(section.offerSectionBody)}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
