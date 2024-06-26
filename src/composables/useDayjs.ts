import useLocale from "./useLocale";
import { ref, watch, Ref } from "vue";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import es from "dayjs/locale/es";
import en from "dayjs/locale/en";
import localeData from "dayjs/plugin/localeData";

const { currentLocale } = useLocale();

watch(
  () => currentLocale.value,
  (newLocale) => {
    setDayjsLocale(newLocale);
  }
);

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localeData);

const shortMonthNames: Ref<string[]> = ref([]);
const monthNames: Ref<string[]> = ref([]);

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
  return shortMonthNames.value[dayjs(date).month()];
}

export function getMonthName(date: string): string {
  return monthNames.value[dayjs(date).month()];
}

export function getYear(date: string): number {
  return dayjs(date).year();
}

export function setDayjsLocale(locale: string) {
  if (locale === "es") {
    dayjs.locale(es);
  }
  if (locale === "en") {
    dayjs.locale(en);
  }
  shortMonthNames.value = dayjs.monthsShort();
  monthNames.value = dayjs.months();
}

export default (locale: string = currentLocale.value) => {
  setDayjsLocale(locale);

  return {
    now,
    differenceBetweenTwoDates,
    getShortMonthName,
    getMonthName,
    getYear,
    setDayjsLocale,
  };
};
