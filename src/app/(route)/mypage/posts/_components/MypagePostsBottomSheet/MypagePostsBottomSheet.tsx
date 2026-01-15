"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";
import { cn } from "@/utils";
import { getDaysInMonth } from "date-fns";
import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { MYPAGE_POSTS_SHEET_FILTER } from "../../_constants/MYPAGE_POSTS_SHEET_FILTER";
import { FilterModeType } from "../../_types/FilterModeType";

const DateWheel = ({
  dateArray,
  selected,
  onSelected,
  label,
}: {
  dateArray: number[];
  selected: number;
  onSelected: (value: number) => void;
  label?: string;
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiperInstance && !swiperInstance.destroyed) {
      const index = dateArray.indexOf(selected);
      if (index !== -1 && swiperInstance.activeIndex !== index) {
        swiperInstance.slideTo(index);
      }
    }
  }, [selected, dateArray, swiperInstance]);

  return (
    <div className="relative h-[140px] w-full overflow-hidden flex-center">
      <div className="absolute" />

      <Swiper
        direction="vertical"
        slidesPerView={2}
        centeredSlides={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => onSelected(dateArray[swiper.activeIndex])}
        initialSlide={dateArray.indexOf(selected)}
        className="h-full w-full"
        modules={[Mousewheel]}
        mousewheel={{
          forceToAxis: true, // 세로 스크롤만 허용
          sensitivity: 0.5, // 휠 감도 조절
          thresholdDelta: 10, // 작은 떨림 무시
        }}
      >
        {dateArray.map((item) => (
          <SwiperSlide
            key={item}
            className={cn(
              "flex w-full items-center justify-center text-[20px] font-semibold text-neutral-strong-disabled transition-colors",
              "[&.swiper-slide-active]:text-[20px] [&.swiper-slide-active]:text-neutral-strong-default"
            )}
          >
            <div className="flex-center">
              {item}
              {label && <span>{label}</span>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

interface MypagePostsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  mode: FilterModeType;
}

const MypagePostsBottomSheet = ({ isOpen, onClose, mode }: MypagePostsBottomSheetProps) => {
  const today = new Date();

  const [selectDate, setSelectDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

  const years = useMemo(() => {
    const startYear = 2025;
    return Array.from({ length: today.getFullYear() - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

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

  return (
    <PopupLayout
      isOpen={isOpen}
      onClose={onClose}
      className={cn("w-full gap-12 px-5 py-10 flex-col-center")}
    >
      {mode === "Date" && (
        <div className="w-full gap-8 flex-col-center">
          <h2 className="text-h2-medium">기간설정</h2>

          {/* 상단 탭 버튼 */}
          <div className="flex gap-[14px]">
            <Filter ariaLabel="시작일" onSelected={true} className="!px-10 !py-2">
              시작일
            </Filter>
            <Filter ariaLabel="종료일" onSelected={false} className="!px-10 !py-2">
              종료일
            </Filter>
          </div>

          <div className="flex w-full items-center justify-between px-4">
            <DateWheel
              dateArray={years}
              selected={selectDate.year}
              onSelected={(val) => handleDateChange("year", val)}
            />

            <DateWheel
              dateArray={months}
              selected={selectDate.month}
              onSelected={(val) => handleDateChange("month", val)}
              label="월"
            />

            <DateWheel
              dateArray={days}
              selected={selectDate.day}
              onSelected={(val) => handleDateChange("day", val)}
              label="일"
            />
          </div>
        </div>
      )}

      {mode === "Filter" && (
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
