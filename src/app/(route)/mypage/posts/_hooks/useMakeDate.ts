import { getDaysInMonth } from "date-fns";
import { useMemo, useState } from "react";

const useMakeDate = () => {
  const today = new Date();
  const startYear = 2025;

  const [selectDate, setSelectDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

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
