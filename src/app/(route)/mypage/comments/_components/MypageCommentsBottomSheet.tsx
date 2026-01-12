import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { cn } from "@/utils";
import { useState } from "react";
import Picker from "react-mobile-picker";

interface MypageCommentsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  state: "Date" | "Filter";
}

const MypageCommentsBottomSheet = ({ isOpen, onClose, state }: MypageCommentsBottomSheetProps) => {
  const today = new Date();
  const [datePicker, setDatePicker] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDay(),
  });

  // 년도 배열
  const getYears = (startYear: number, endYear: number) => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => String(startYear + i));
  };
  const currentYear = today.getFullYear();
  const Years = getYears(2025, currentYear);
  const Months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const Days = Array.from({ length: 31 }, (_, i) => String(i + 1));

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
            value={datePicker}
            onChange={setDatePicker}
            wheelMode="normal"
            height={130}
            itemHeight={64.5}
            className="flex w-full text-[20px] text-neutral-strong-default"
          >
            <Picker.Column name="year">
              {Years.map((year) => (
                <Picker.Item key={year} value={year}>
                  {year}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="month">
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
            </Picker.Column>
          </Picker>
        </div>
      )}

      <Button onClick={onClose} size="big" className="h-[44px] w-full">
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default MypageCommentsBottomSheet;
