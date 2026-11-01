// Polish date formatting, matching the predecessor site's `GetPrettyDatePL`
// (weekday + day + month + year, e.g. "poniedziałek, 15 marca 2025").

const prettyDatePL = new Intl.DateTimeFormat('pl-PL', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDatePL(isoDate: string): string {
  // Append a time so the date is parsed in local time, not shifted by UTC.
  return prettyDatePL.format(new Date(`${isoDate}T00:00:00`));
}

// Slugify a title into a URL segment, matching the predecessor (Gatsby) site's
// `slugify` so existing /aktualnosci/<date>/<slug> URLs stay byte-identical and
// keep their Google rankings. News posts have no `slug` field in Contentful —
// the slug is derived from the title at build time.
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
