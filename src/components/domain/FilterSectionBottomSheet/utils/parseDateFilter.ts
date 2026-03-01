import { YmdDate } from "../../DateRangeBottomSheet/YmdDate";

export const formatYmdLabel = (date: YmdDate) =>
  `${date.year}.${String(date.month).padStart(2, "0")}.${String(date.day).padStart(2, "0")}`;

export const parseYmd = (originQueryDate: string | null) => {
  if (!originQueryDate) return null;

  const DateArray = originQueryDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!DateArray) return null;

  const year = Number(DateArray[1]);
  const month = Number(DateArray[2]);
  const day = Number(DateArray[3]);

  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
};
