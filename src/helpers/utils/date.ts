import dayjs from "dayjs";

export const getYearFromDate = (date: Date | string) => {
  return dayjs(date).year();
};
