/**
 * @author suhyeon
 *
 * 날짜 선택 UI에서 사용할 연/월/일 상태와 선택 핸들러를 생성하는 커스텀 훅입니다.
 *
 * @param queryDate - URL query 등에서 전달되는 초기 날짜 값
 * @param queryDate.year - 연도
 * @param queryDate.month - 월 (1 ~ 12)
 * @param queryDate.day - 일 (1 ~ 31)
 *
 * @returns {{
 *  years: number[]
 *  months: number[]
 *  days: number[]
 *  selectDate: { year: number; month: number; day: number }
 *  handleDateChange: (type: "year" | "month" | "day", value: number) => void
 * }}
 *
 * 반환 값 설명
 *
 * - years
 *   선택 가능한 연도 목록 (startYear ~ 현재 연도)
 *
 * - months
 *   선택 가능한 월 목록 (1 ~ 12)
 *
 * - days
 *   선택된 year/month 기준 해당 월의 일 목록
 *
 * - selectDate
 *   현재 선택된 날짜 상태
 *
 * - handleDateChange
 *   연/월/일 변경 핸들러
 *   - year/month 변경 시 해당 월의 최대 일수를 계산하여 day 자동 보정
 *
 */

import { getDaysInMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";

const useMakeDate = (queryDate?: { year: number; month: number; day: number }) => {
  const today = new Date();
  const startYear = 2025;

  // 현재 날짜
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const [selectDate, setSelectDate] = useState(
    queryDate ?? { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
  );

  useEffect(() => {
    if (!queryDate) return;

    const isDifferent =
      selectDate.year !== queryDate.year ||
      selectDate.month !== queryDate.month ||
      selectDate.day !== queryDate.day;

    if (isDifferent) {
      setSelectDate(queryDate);
    }

    setSelectDate((prev) =>
      prev.year === queryDate.year && prev.month === queryDate.month && prev.day === queryDate.day
        ? prev
        : queryDate
    );
  }, [queryDate?.year, queryDate?.month, queryDate?.day]);

  // 날짜 배열 (년, 월, 일)
  const years = Array.from(
    { length: today.getFullYear() - startYear + 1 },
    (_, i) => startYear + i
  );

  const months = useMemo(() => {
    const isYearMax = selectDate.year === currentYear;
    const length = isYearMax ? currentMonth : 12;
    return Array.from({ length }, (_, i) => i + 1);
  }, [selectDate.year, currentMonth, currentYear]);

  const days = useMemo(() => {
    const isYearMax = selectDate.year === currentYear;
    const isMonthMax = selectDate.month === currentMonth;

    const date = new Date(selectDate.year, selectDate.month - 1);
    const maxDaysInMonth = getDaysInMonth(date);

    const length = isYearMax && isMonthMax ? currentDate : maxDaysInMonth;
    return Array.from({ length }, (_, i) => i + 1);
  }, [selectDate.year, selectDate.month, currentYear, currentMonth, currentDate]);

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

  const handleResetDate = () => {
    setSelectDate({ year: currentYear, month: currentMonth, day: currentDate });
  };

  return {
    years,
    months,
    days,
    selectDate,
    handleDateChange,
    handleResetDate,
  };
};

export default useMakeDate;
