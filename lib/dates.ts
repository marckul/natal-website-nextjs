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
