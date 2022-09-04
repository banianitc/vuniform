import { DateTime } from 'luxon';

export const formatDateTime = (datetime: DateTime | string, format: Intl.DateTimeFormatOptions, locale?: string): string => {
  let dt = typeof datetime === 'string' ? DateTime.fromISO(datetime) : datetime;

  if (locale) {
    dt = dt.setLocale(locale)
  }

  return dt.toLocaleString(format);
};
