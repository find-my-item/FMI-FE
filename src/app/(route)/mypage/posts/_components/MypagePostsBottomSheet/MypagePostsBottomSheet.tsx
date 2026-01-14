import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { cn } from "@/utils";
import { useMemo, useState } from "react";
import Picker from "react-mobile-picker";
import { MYPAGE_POSTS_SHEET_FILTER } from "../../_constants/MYPAGE_POSTS_SHEET_FILTER";
import { getDaysInMonth, lastDayOfMonth, format } from "date-fns";

interface MypagePostsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  state: "Date" | "Filter";
}

const MypagePostsBottomSheet = ({ isOpen, onClose, state }: MypagePostsBottomSheetProps) => {
  const today = new Date();
  const [selectDate, setSelectDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

  const daysInMonth = useMemo(() => {
    const date = new Date(selectDate.year, selectDate.month - 1);
    return getDaysInMonth(date);
  }, [selectDate.year, selectDate.month]);

  const makeDaysArray = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [daysInMonth]);

  const handleDayChange = (newValue: { year: number; month: number; day: number }) => {
    const { year, month, day } = newValue;

    const maxDays = getDaysInMonth(new Date(year, month - 1));

    const adjustedDay = day > maxDays ? maxDays : day;

    setSelectDate({
      year,
      month,
      day: adjustedDay,
    });
  };

  return (
    <PopupLayout
      isOpen={isOpen}
      onClose={onClose}
      className={cn("w-full gap-12 px-5 py-10 flex-col-center")}
    >
      {state === "Date" && (
        <div className="w-full gap-8 flex-col-center">
          <h2 className="text-h2-medium">기간설정</h2>
          <div className="flex gap-[14px]">
            <Filter ariaLabel="시작일" onSelected={true} className="px-10 py-2">
              시작일
            </Filter>
            <Filter ariaLabel="종료일" onSelected={false}>
              종료일
            </Filter>
          </div>

          {/* 달력 */}
          <Picker
            value={selectDate}
            onChange={handleDayChange}
            wheelMode="normal"
            height={130}
            itemHeight={64.5}
            className="flex w-full text-[20px] text-neutral-strong-default"
          >
            <Picker.Column name="year">
              {Array.from(
                { length: today.getFullYear() - selectDate.year + 1 },
                (_, i) => selectDate.year + i
              ).map((item) => (
                <Picker.Item key={item} value={item}>
                  {item}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="month">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <Picker.Item key={month} value={month}>
                  {month}월
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="day">
              {makeDaysArray.map((day) => (
                <Picker.Item key={day} value={day}>
                  {day}일
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}

      {state === "Filter" && (
        <div className="flex gap-8 flex-col-center">
          <h2 className="text-h2-medium text-layout-header-default">필터</h2>
          {MYPAGE_POSTS_SHEET_FILTER.map((item) => (
            <div key={item.title} className="flex w-full flex-col gap-4">
              <h3 className="text-h3-semibold text-layout-header-default">{item.title}</h3>
              <div className="flex flex-wrap gap-2">
                {item.kind.map((item) => (
                  <Filter key={item} ariaLabel={item} onSelected={false} className="px-[18px] py-2">
                    {item}
                  </Filter>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Button onClick={onClose} size="big" className="h-[44px] w-full">
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default MypagePostsBottomSheet;
