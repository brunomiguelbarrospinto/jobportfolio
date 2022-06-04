import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import es from "dayjs/locale/es";
import en from "dayjs/locale/en";

import localeData from "dayjs/plugin/localeData";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(es);
dayjs.extend(localeData);

export const shortMonthNames = dayjs.monthsShort();

export function now(): Dayjs {
  return dayjs();
}

export function differenceBetweenTwoDates(
  start: string | Dayjs,
  finish: string | Dayjs
): string {
  const startDate = dayjs(start);
  const finishDate = dayjs(finish);

  return startDate.from(finishDate, true);
}

export function getShortMonthName(date: string): string {
  return shortMonthNames[dayjs(date).month()];
}

export function getYear(date: string): number {
  return dayjs(date).year();
}
