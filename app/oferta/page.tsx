import type {Metadata} from 'next';
import Row from '@/components/Row';
import {offerSubpages} from '@/lib/mock-oferta';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Oferta — Natal Instalacje',
  description:
    'Oferta firmy Natal Instalacje: centralne ogrzewanie, instalacje gazowe, WOD-KAN, fotowoltaika, wentylacja.',
};

export default function OfertaPage() {
  return (
    <>
      <section className="main-offer-jumbotron">
        <div className="container">
          <div className="col-md-8">
            <h1 className="display-2 fw-normal">Nasza oferta</h1>
            <p className="lead fw-normal">
              Prowadzimy naszą działalność w dziedzinach związanych z
              budownictwem mieszkaniowym.
            </p>
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
