import { DateTime } from 'luxon';

export const formatDateTime = (datetime: DateTime | string, format: Intl.DateTimeFormatOptions): string => {
  const dt = typeof datetime === 'string' ? DateTime.fromISO(datetime) : datetime;

  return dt
    // TODO
    // .setLocale(rootStore.locale)
    .toLocaleString(format);
};
