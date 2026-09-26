import type {Metadata} from 'next';
import type {RenderNode} from '@contentful/rich-text-react-renderer';
import {BLOCKS, type Document} from '@contentful/rich-text-types';

import {getClient, isModelDanychTitle} from '@/lib/contentful';
import {renderRichText} from '@/lib/rich-text';
import {slugify} from '@/lib/slugify';

// Fields we read off the `offerPageOurOffer` entry. Names mirror Contentful 1:1;
// the two columns are rich-text `Document`s. Loose cast for now.
interface OfferPageOurOfferFields {
  title?: string;
  leadText?: string;
  bodyCol1?: Document;
  bodyCol2?: Document;
}

interface OfferPageSectionFields {
  title: string;
  leadText?: string;
  sectionsPosition: number;
  offerSectionBody: Document;
}

type OfferPageSection = OfferPageSectionFields & {id: string};

// SPRZEDAŻ / WYKONAWSTWO-USŁUGI column titles are heading-2 in the CMS;
// render them as Bootstrap display-4 to match the predecessor.
const ourOfferColumnHeadings: RenderNode = {
  [BLOCKS.HEADING_2]: (_node, children) => (
    <h2 className="display-4">{children}</h2>
  ),
};

async function getOfferPageOurOffer() {
  const res = await getClient().getEntries({
    content_type: 'offerPageOurOffer',
  });
  return res.items
    .map((entry) => entry.fields as OfferPageOurOfferFields)
    .find((fields) => !isModelDanychTitle(fields.title));
}

async function getOfferPageSections(): Promise<OfferPageSection[]> {
  const res = await getClient().getEntries({content_type: 'offerPageSection'});

  // Prepare data for display in the offer page. Carry the entry id for a stable
  // React key (section positions aren't guaranteed unique).
  return res.items
    .map((entry) => ({
      id: entry.sys.id,
      ...(entry.fields as unknown as OfferPageSectionFields),
    }))
    .filter((section) => !isModelDanychTitle(section.title))
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
        <section key={section.id} id={slugify(section.title)}>
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
