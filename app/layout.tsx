import type {Metadata} from 'next';
import {Lato} from 'next/font/google';
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Lato, self-hosted via next/font
const lato = Lato({
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Natal Instalacje',
  description: 'Sprzedaż i wykonawstwo instalacji ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={lato.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
