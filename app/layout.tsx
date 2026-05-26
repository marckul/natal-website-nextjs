import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main style={{paddingTop: '56px'}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
