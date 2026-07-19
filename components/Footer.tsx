import Link from 'next/link';
import Phone from '@/components/Phone';

function FacebookLink() {
  return (
    <a
      href="https://www.facebook.com/Natalia-Kula-Natal-PHU-144612016049541/"
      target="_blank"
      rel="noopener noreferrer"
      className="link-light d-inline-block"
      aria-label="Odwiedź nasz profil na Facebooku"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row small justify-content-between">
          <div className="col-md px-5 my-2">
            <h2 className="h4">Sprzedaż</h2>
            <ul>
              <li>kotły co</li>
              <li>grzejniki</li>
              <li>pompy ciepła</li>
              <li>zasobniki cwu</li>
              <li>panele fotowoltaiczne</li>
              <li>materiały instalacyjne</li>
            </ul>
          </div>
          <div className="col-md px-5 my-2">
            <h2 className="h4 d-block d-lg-none">Wykonawstwo-usługi</h2>
            <h2 className="h4 d-none d-lg-block">
              Wykonawstwo&nbsp;-&nbsp;usługi
            </h2>
            <ul>
              <li>instalacje gazowe</li>
              <li>instalacje co</li>
              <li>instalacje wod-kan</li>
              <li>fotowoltaika</li>
              <li>wentylacja z rekuperacją</li>
              <li>instalacje elektryczne</li>
            </ul>
          </div>
          <div className="col-md-12 col-lg-4 px-5 my-2">
            <div className="row justify-content-between">
              <div className="col-sm-6">
                <h2 className="h4">Kontakt</h2>
                <address className="mb-0">
                  Miejska 13, 44-200 Rybnik
                  <br />
                  Natalia Kula &quot;Natal&quot; PHU
                </address>
              </div>
              <div className="col-sm-6 py-3 text-center d-none d-sm-block">
                <FacebookLink />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="h5">Telefon</h3>
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
            <div className="py-3 text-center d-block d-sm-none mt-4">
              <FacebookLink />
            </div>
          </div>
        </div>
        <p className="text-center">Copyright &copy; 2026 NATAL INSTALACJE</p>
        <p className="text-center">
          <Link className="text-white" href="/regulamin-strony">
            Regulamin Strony
          </Link>
        </p>
      </div>
    </footer>
  );
}
