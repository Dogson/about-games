import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/en";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export const getYearFromDate = (date: Date | string | number | null) => {
  if (!date) return null;
  return typeof date === "number"
    ? dayjs.unix(date).year()
    : dayjs(date).year();
};

export const formatDateLocalized = (
  date: Date | string,
  locale: string,
): string => {
  dayjs.locale(locale);

  return dayjs(date).format("L");
};

export const timestampStrToSeconds = (timestamp: string): number => {
  return timestamp
    .split(":")
    .map(Number)
    .reverse()
    .reduce((total, value, index) => total + value * 60 ** index, 0);
};
