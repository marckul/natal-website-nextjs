import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Strona nie znaleziona — Natal Instalacje',
};

export default function NotFound() {
  return (
    <div className="container my-5 py-5">
      <h1 className="pt-5 mt-5 display-4">Błąd 404</h1>
      <p>Strona której szukasz nie istnieje lub została usunięta :( </p>
      <Link href="/">Powrót do strony głównej</Link>
    </div>
  );
}
