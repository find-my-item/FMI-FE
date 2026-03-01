import { getDaysInMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";

const useMakeDate = (queryDate?: { year: number; month: number; day: number }) => {
  const today = new Date();
  const startYear = 2025;

  const [selectDate, setSelectDate] = useState(
    queryDate ?? { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
  );

  useEffect(() => {
    if (!queryDate) return;
    setSelectDate((prev) =>
      prev.year === queryDate.year && prev.month === queryDate.month && prev.day === queryDate.day
        ? prev
        : queryDate
    );
  }, [queryDate?.year, queryDate?.month, queryDate?.day]);

  const years = Array.from(
    { length: today.getFullYear() - startYear + 1 },
    (_, i) => startYear + i
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const days = useMemo(() => {
    const date = new Date(selectDate.year, selectDate.month - 1);
    const daysCount = getDaysInMonth(date);
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  }, [selectDate.year, selectDate.month]);

  const handleDateChange = (type: "year" | "month" | "day", value: number) => {
    setSelectDate((prev) => {
      const newDateArray = { ...prev, [type]: value };

      if (type !== "day") {
        const maxDay = getDaysInMonth(new Date(newDateArray.year, newDateArray.month - 1));
        if (newDateArray.day > maxDay) {
          newDateArray.day = maxDay;
        }
      }
      return newDateArray;
    });
  };

  return {
    years,
    months,
    days,
    selectDate,
    handleDateChange,
  };
};

export default useMakeDate;
