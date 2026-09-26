// News posts have no `slug` field — the URL segment is derived from the title
// at build time. The mapping must stay byte-identical to the Gatsby
// `slugify` so `/aktualnosci/<date>/<slug>` URLs keep their Google rankings.
//
// Polish-only content, so only Polish diacritics are mapped (ą ć ę ł ń ó ś
// ź ż). The predecessor mapped a wider Latin set; none of those appear here.

const asciiByDiacritic: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

/**
 * Turns a title into a URL slug: lowercase, Polish diacritics stripped,
 * separators collapsed to a single dash.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[ąćęłńóśźż]/g, (char) => asciiByDiacritic[char] ?? char)
    .replace(/[·/_,:;']/g, '-') // separators → dash
    .replace(/\?/g, '') // drop question marks
    .replace(/\s+/g, '-') // whitespace → dash
    .replace(/--+/g, '-') // collapse repeats
    .replace(/^-+/, '') // trim leading dashes
    .replace(/-+$/, ''); // trim trailing dashes
}
