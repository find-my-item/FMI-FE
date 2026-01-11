import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { useState } from "react";
import Picker from "react-mobile-picker";

interface MypagePostsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  state: "Date" | "Filter";
}

const FILTER_CONFIG = [
  {
    title: "분류",
    kind: ["전체", "분실", "습득"],
  },
  {
    title: "카테고리",
    kind: ["전체", "전자기기", "지갑", "신분증", "귀금속", "가방", "카드", "기타"],
  },
  {
    title: "정렬",
    kind: ["최신순", "오래된 순", "즐겨찾기 많은 순", "조회 많은 순"],
  },
  {
    title: "찾음 여부",
    kind: ["전체", "찾는중", "찾았음"],
  },
];

const MypagePostsBottomSheet = ({ isOpen, onClose, state }: MypagePostsBottomSheetProps) => {
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
      className={"h-[400px] w-full gap-8 px-5 py-10 flex-col-center"}
    >
      {state === "Date" && (
        <>
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
          <Picker value={datePicker} onChange={setDatePicker} wheelMode="normal">
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

          <Button onClick={onClose} size="big" className="h-[44px] w-full">
            닫기
          </Button>
        </>
      )}

      {state === "Filter" && (
        <>
          <h2 className="text-h2-medium">필터</h2>
          {FILTER_CONFIG.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              {item.kind.map((item) => (
                <Filter ariaLabel={item} onSelected={true} className="px-10 py-2">
                  {item}
                </Filter>
              ))}
            </div>
          ))}
        </>
      )}
    </PopupLayout>
  );
};

export default MypagePostsBottomSheet;
