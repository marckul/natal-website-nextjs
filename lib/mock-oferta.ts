import type {StronaOfertyPodstronaFields} from '@/lib/contentful-types';

// Throwaway mock data for the offer subpages. Replaced by live
// `delivery.getEntries('stronaOfertyPodstrona')` queries in the Contentful
// phase. `title`/`leadText` are the client-approved strings ported verbatim
// from the predecessor site's home-page cards; `body` is a Lorem placeholder
// standing in for the rich-text field.

const loremBody: string[] = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

export const offerSubpages: StronaOfertyPodstronaFields[] = [
  {
    title: 'Centralne Ogrzewanie',
    slug: 'centralne-ogrzewanie',
    leadText:
      'W naszej ofercie znajdziecie państwo kotły kondensacyjne, pompy ciepła, ogrzewanie podłogowe oraz inne rozwiązania zapewniające właściwe ogrzewanie budynku, które stosuje się w nowoczesnym budownictwie.',
    leadTextLong: '',
    body: loremBody,
  },
  {
    title: 'Koparka',
    slug: 'roboty-ziemne',
    leadText:
      'Oferujemy wynajem minikoparki Kubota KX018-4 wraz z wykwalifikowanym operatorem. Wykonujemy wykopy zarówno pod instalacje wodno-kanalizacyjne, gazowe jak i inne wykopy związane z remontem i budową domu.',
    leadTextLong: '',
    body: loremBody,
  },
  {
    title: 'Fotowoltaika i Wentylacja',
    slug: 'fotowoltaika',
    leadText:
      'Zajmujemy się sprzedażą i montażem ogniw fotowoltaicznych i solarów, a także instalacją systemów wentylacji z rekuperacją.',
    leadTextLong: '',
    body: loremBody,
  },
  {
    title: 'Instalacje WOD-KAN',
    slug: 'instalacje-wod-kan',
    leadText:
      'Wykonujemy przyłącza wodne i kanalizacyjne. Dzięki stałej współpracy z projektantami instalacji jesteśmy w stanie zapewnić również projekt wykonywanej instalacji przyłącza.',
    leadTextLong: '',
    body: loremBody,
  },
];

export function getOfferSubpage(
  slug: string
): StronaOfertyPodstronaFields | undefined {
  return offerSubpages.find((page) => page.slug === slug);
}
