import Card, {CardText, CardTitle} from '@/components/Card';
import CarouselHero from '@/components/CarouselHero';
import Phone from '@/components/Phone';
import Row from '@/components/Row';

export default function HomePage() {
  return (
    <>
      <section id="start">
        <CarouselHero />
        <div className="container py-md-5 my-5">
          <h1 className="display-3">Natal Instalacje</h1>
          <p className="lead fw-bold">
            Zajmujemy się kompleksowym wykonawstwem robót instalacyjnych w
            domach, mieszkaniach, obiektach użyteczności publicznej i innych
            oraz sprzedażą materiałów instalacyjnych w Rybniku.
            <br />
            Nasze doświadczenie w branży sięga 30 lat.
          </p>
          <p className="lead">
            Jesteśmy w stanie wykonać każdą instalację podejmując się nawet
            najtrudniejszych zadań. Współpracujemy również z zaufanymi
            projektantami instalacji, którzy projektują dla nas instalacje
            gazowe oraz inne, załatwiając wszelkie formalności za klienta,
            włącznie z nadzorem kierownika budowy.
          </p>
        </div>
      </section>

      <section id="oferta" className="container py-md-5 my-5">
        <h2 className="display-3">Oferta</h2>
        <p className="lead">
          Prowadzimy działalność w zakresie{' '}
          <strong>sprzedaży, wykonawstwa i serwisu</strong> w poniższych
          dziedzinach
        </p>
        <Row justifyContent="around">
          <Card
            id="centralne-ogrzewanie"
            to="/oferta/#centralne-ogrzewanie"
            src="/images/gas-boiler.png"
            alt="Kocioł gazowy kondensacyjny"
            small=""
          >
            <CardTitle>Centralne Ogrzewanie</CardTitle>
            <CardText>
              W naszej ofercie znajdziecie państwo kotły kondensacyjne, pompy
              ciepła, ogrzewanie podłogowe oraz inne rozwiązania zapewniające
              właściwe ogrzewanie budynku, które stosuje się w nowoczesnym
              budownictwie.
            </CardText>
          </Card>
          <Card
            id="roboty-ziemne"
            to="/oferta#roboty-ziemne"
            src="/images/excavator-sketch.png"
            alt="Minikoparka Kubota KX018-4"
            small=""
          >
            <CardTitle>Koparka</CardTitle>
            <CardText>
              Oferujemy wynajem{' '}
              <strong>minikoparki&nbsp;Kubota KX018&nbsp;-&nbsp;4</strong> wraz
              z wykwalifikowanym operatorem. Wykonujemy wykopy zarówno pod
              instalacje wodno-kanalizacyjne, gazowe jak i inne wykopy związane
              z remontem i budową domu
            </CardText>
          </Card>
          <Card
            id="fotowoltaika-i-wentylacja"
            to="/oferta/#fotowoltaika"
            src="/images/photovoltaics-sketch.jpg"
            alt="Panele fotowoltaiczne na dachu budynku"
            small=""
          >
            <CardTitle>Fotowoltaika i Wentylacja</CardTitle>
            <CardText>
              Zajmujemy się sprzedażą i montażem ogniw fotowoltaicznych i
              solarów, a także instalacją systemów wentylacji z rekuperacją.
            </CardText>
          </Card>
          <Card
            id="instalacje-wod-kan"
            to="/oferta#instalacje-wod-kan"
            src="/images/tap-sketch.png"
            alt="Rysunek techniczny kurka wodnego"
            small=""
          >
            <CardTitle>Instalacje WOD-KAN</CardTitle>
            <CardText>
              Wykonujemy przyłącza wodne i kanalizacyjne. Dzięki stałej
              współpracy z projektantami instalacji jesteśmy w stanie zapewnić
              również projekt wykonywanej instalacji przyłącza.
            </CardText>
          </Card>
        </Row>
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

      <section id="kontakt">
        <div
          className="py-5 d-flex flex-column justify-content-center position-relative text-white"
          style={{
            backgroundImage: 'url(/images/natal-pipes.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{background: 'rgba(0,0,0,0.6)'}}
          />
          <div className="container position-relative py-5 my-5">
            <div className="row mx-auto px-0 justify-content-between">
              <div className="col-12">
                <h2 className="display-2 text-start mb-5">Jak nas znaleźć?</h2>
              </div>
              <div className="col-md-4 col-lg-3 mb-5">
                <h3 className="h2">Nasz adres</h3>
                <address className="mb-0">
                  Miejska 13, 44-200 Rybnik
                  <br />
                  Natalia Kula &quot;Natal&quot; PHU
                </address>
              </div>
              <div className="col-md-3 col-lg-2 mb-5">
                <h3 className="h2">Telefon</h3>
                <Phone tel="500087801" className="link-light">
                  500 087 801
                </Phone>
                <Phone tel="500087803" className="link-light">
                  500 087 803
                </Phone>
                <Phone tel="324231129" className="link-light">
                  32&nbsp;42&nbsp;31&nbsp;129
                </Phone>
              </div>
              <div className="col-md col-lg-5 mb-5">
                <div className="openning-hours">
                  <h3 className="h2">Godziny otwarcia</h3>
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
                          <th>{day}</th>
                          <td>{hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-3 fst-italic">
                    W przypadku świąt godziny otwarcia mogły ulec zmianie.{' '}
                    <a
                      href="https://www.google.com/maps/place/Sprzeda%C5%BC+i+wykonawstwo+instalacji+-+Natal+Instalacje,+Miejska+13,+44-200+Rybnik,+Polska/@50.0921913,18.5426409,19z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-light"
                    >
                      Sprawdź tutaj
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ratio shadow-lg" style={{paddingBottom: '30%'}}>
          <iframe
            title="Mapa lokalizacji firmy Natal Instalacje"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3947.521810683705!2d18.540439660763354!3d50.09281379742586!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x448e4c006b68ed07!2sSprzeda%C5%BC%20i%20wykonawstwo%20instalacji%20-%20Natal%20Instalacje!5e0!3m2!1spl!2spl!4v1622279430446!5m2!1spl!2spl"
            width="800"
            height="600"
            loading="lazy"
            style={{border: 0, width: '100%', height: '100%'}}
          />
        </div>
      </section>
    </>
  );
}
