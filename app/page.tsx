import Image from 'next/image';

const ofertaCards = [
  {
    id: 'centralne-ogrzewanie',
    title: 'Centralne Ogrzewanie',
    img: '/images/gas-boiler.png',
    alt: 'Kocioł gazowy kondensacyjny',
    text: 'W naszej ofercie znajdziecie państwo kotły kondensacyjne, pompy ciepła, ogrzewanie podłogowe oraz inne rozwiązania zapewniające właściwe ogrzewanie budynku.',
  },
  {
    id: 'koparka',
    title: 'Koparka',
    img: '/images/excavator-sketch.png',
    alt: 'Minikoparka Kubota KX018-4',
    text: 'Oferujemy wynajem minikoparki Kubota KX018-4 wraz z wykwalifikowanym operatorem. Wykonujemy wykopy pod instalacje i inne prace ziemne.',
  },
  {
    id: 'fotowoltaika-i-wentylacja',
    title: 'Fotowoltaika i Wentylacja',
    img: '/images/photovoltaics-sketch.jpg',
    alt: 'Panele fotowoltaiczne na dachu',
    text: 'Zajmujemy się sprzedażą i montażem ogniw fotowoltaicznych i solarów, a także instalacją systemów wentylacji z rekuperacją.',
  },
  {
    id: 'instalacje-wod-kan',
    title: 'Instalacje WOD-KAN',
    img: '/images/tap-sketch.png',
    alt: 'Rysunek techniczny kurka wodnego',
    text: 'Wykonujemy przyłącza wodne i kanalizacyjne. Współpracujemy z projektantami instalacji zapewniając projekt i nadzór kierownika budowy.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero placeholder — carousel goes here in Phase 2 */}
      <section
        id="start"
        className="position-relative text-white d-flex align-items-center"
        style={{
          minHeight: '60vh',
          marginTop: '56px',
          backgroundImage: 'url(/images/natal-pipes-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{background: 'rgba(0,0,0,0.55)'}}
        />
        <div className="container position-relative py-5">
          <h2 className="display-3 fw-bold">Nasza oferta</h2>
          <p className="lead">
            Oferujemy szeroki asortyment materiałów instalacyjnych. Zapoznaj się
            z naszą ofertą.
          </p>
        </div>
      </section>

      <section id="natal" className="container py-md-5 my-5">
        <h1 className="display-3">Natal Instalacje</h1>
        <p className="lead fw-bold">
          Zajmujemy się kompleksowym wykonawstwem robót instalacyjnych w domach,
          mieszkaniach, obiektach użyteczności publicznej i innych oraz
          sprzedażą materiałów instalacyjnych w Rybniku.
          <br />
          Nasze doświadczenie w branży sięga 30 lat.
        </p>
        <p className="lead">
          Jesteśmy w stanie wykonać każdą instalację podejmując się nawet
          najtrudniejszych zadań. Współpracujemy również z zaufanymi
          projektantami instalacji, którzy projektują dla nas instalacje gazowe
          oraz inne, załatwiając wszelkie formalności za klienta, włącznie z
          nadzorem kierownika budowy.
        </p>
      </section>

      <section id="oferta" className="container py-md-5 my-5">
        <h1 className="display-3">Oferta</h1>
        <p className="lead">
          Prowadzimy działalność w zakresie{' '}
          <strong>sprzedaży, wykonawstwa i serwisu</strong> w poniższych
          dziedzinach
        </p>
        <div className="row justify-content-around g-4 mt-2">
          {ofertaCards.map(({id, title, img, alt, text}) => (
            <div key={id} className="col-md-6 col-lg-3">
              <div className="card h-100">
                <Image
                  src={img}
                  alt={alt}
                  width={400}
                  height={260}
                  className="card-img-top"
                  style={{
                    objectFit: 'contain',
                    background: '#f8f9fa',
                    padding: '1rem',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="o-firmie" className="container my-5 py-5">
        <h2 className="display-3">O firmie</h2>
        <p>
          Przedsiębiorstwo Natal PHU rozpoczęło swoją działalność w 1993 r. w
          Żorach od sprzedaży i montażu elektrycznych kabli grzewczych duńskiej
          firmy DEVI- wiodącego producenta tego produktu na świecie. W tym
          czasie byliśmy jednym z kilku dystrybutorów tego produktu w kraju a
          jedną z dwóch firm na śląsku. Z czasem w miarę rozwoju firmy,
          rozpoczęliśmy montaż ogrzewania podłogowego wodnego oraz wykonawstwo
          instalacji centralnego ogrzewania oraz gazu.
        </p>
        <p>
          Kolejnym krokiem było otwarcie sklepu z materiałami instalacyjnymi w
          Rybniku z roku na rok poszerzając asortyment i związując się z
          wiodącymi producentami na świecie. Obecnie zajmujemy się kompleksowym
          wykonawstwem robót instalacyjnych w obiektach użyteczności publicznej,
          mieszkaniowych i innych oraz sprzedażą materiałów instalacyjnych.
        </p>
        <p>
          Jesteśmy w stanie wykonać każdą instalację podejmując się nawet
          najtrudniejszych zadań. Współpracujemy z projektantami którzy
          projektują dla nas instalacje gazowe oraz inne załatwiając wszelkie
          formalności za klienta, włącznie z nadzorem kierownika budowy.
        </p>
        <p>
          Zlecone prace realizujemy terminowo, w najnowocześniejszych
          technologiach dostępnych na rynku. Zatrudniamy wysoko kwalifikowanych
          pracowników, z długoletnią praktyką zawodową, co pozwala na utrzymanie
          wysokiego poziomu wykonawstwa. Nasza firma posiada wszelkie wymagane
          uprawnienia do prowadzenia wykonywanych prac. Podczas realizacji prac
          instalacyjnych podejmujemy stałą współpracę ze zleceniodawcami w celu
          najefektywniejszej realizacji kontraktu.
        </p>
      </section>

      <section id="kontakt" className="bg-dark text-white py-5">
        <div className="container py-5">
          <h1 className="display-2 mb-5">Jak nas znaleźć?</h1>
          <div className="row justify-content-between">
            <div className="col-md-4 col-lg-3 mb-5">
              <h2>Nasz adres</h2>
              <address>
                Miejska 13, 44-200 Rybnik
                <br />
                Natalia Kula &quot;Natal&quot; PHU
              </address>
            </div>
            <div className="col-md-3 col-lg-2 mb-5">
              <h2>Telefon</h2>
              <a className="text-white d-block" href="tel:500087801">
                500 087 801
              </a>
              <a className="text-white d-block" href="tel:500087803">
                500 087 803
              </a>
              <a className="text-white d-block" href="tel:324231129">
                32&nbsp;42&nbsp;31&nbsp;129
              </a>
            </div>
            <div className="col-md col-lg-5 mb-5">
              <h2>Godziny otwarcia</h2>
              <table>
                <tbody>
                  {[
                    ['poniedziałek', '08:30–16:00'],
                    ['wtorek', '08:30–16:00'],
                    ['środa', '08:30–16:00'],
                    ['czwartek', '08:30–16:00'],
                    ['piątek', '08:30–16:00'],
                    ['sobota', '09:00–12:00'],
                    ['niedziela', 'Zamknięte'],
                  ].map(([day, hours]) => (
                    <tr key={day}>
                      <th className="pe-4">{day}</th>
                      <td>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
