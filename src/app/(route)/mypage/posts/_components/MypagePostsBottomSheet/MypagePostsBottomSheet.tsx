import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { cn } from "@/utils";
import { useMemo, useState } from "react";
import Picker from "react-mobile-picker";
import { MYPAGE_POSTS_SHEET_FILTER } from "../../_constants/MYPAGE_POSTS_SHEET_FILTER";
import { getDaysInMonth } from "date-fns";

interface MypagePostsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  state: "Date" | "Filter";
}

const MypagePostsBottomSheet = ({ isOpen, onClose, state }: MypagePostsBottomSheetProps) => {
  const today = new Date();
  const [selectDate, setSelectDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDay(),
  });

  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const daysInMonth = useMemo(() => {
    // new Date(년, 월 인덱스) -> date-fns가 알아서 총 일수 반환
    // 주의: month - 1 (1월은 0, 12월은 11)
    const date = new Date(year, month - 1);
    return getDaysInMonth(date);
  }, [year, month]);

  const makeDaysArray = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [daysInMonth]);

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
            onChange={setSelectDate}
            wheelMode="normal"
            height={130}
            itemHeight={64.5}
            className="flex w-full text-[20px] text-neutral-strong-default"
          >
            <Picker.Column name="year">
              {Array.from({ length: today.getFullYear() - year + 1 }, (_, i) => year + i).map(
                (year) => (
                  <Picker.Item key={year} value={year}>
                    {year}
                  </Picker.Item>
                )
              )}
            </Picker.Column>
            {/* <Picker.Column name="month">
              {Months.map((month) => (
                <Picker.Item key={month} value={month}>
                  {month}월
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="day">
              {Days.map((day) => (
                <Picker.Item key={day} value={day}>
                  {day}일
                </Picker.Item>
              ))}
            </Picker.Column> */}
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
