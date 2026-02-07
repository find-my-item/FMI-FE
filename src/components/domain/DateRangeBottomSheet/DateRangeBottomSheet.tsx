"use client";

import { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { cn } from "@/utils";
import useMakeDate from "./_hooks/useMakeDate";
import PopupLayout from "../PopupLayout/PopupLayout";
import { Button, Filter } from "@/components/common";

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
    <div className="h-[140px] w-full overflow-hidden flex-center">
      <Swiper
        direction="vertical"
        slidesPerView={5}
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
        spaceBetween={8}
      >
        {/* 중앙 선택 영역 강조를 위한 오버레이 */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-[40%] w-full border-b border-neutral-normal-default bg-white opacity-50" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[40%] w-full border-t border-neutral-normal-default bg-white opacity-50" />

        {dateArray.map((item) => (
          <SwiperSlide
            key={item}
            className={cn(
              "flex w-full items-center justify-center text-h2-regular text-layout-header-default transition-colors",
              "[&.swiper-slide-active]:text-h2-regular [&.swiper-slide-active]:text-layout-header-default [&.swiper-slide-active]:opacity-100"
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

interface DateRangeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const DateRangeBottomSheet = ({ isOpen, onClose }: DateRangeBottomSheetProps) => {
  const { years, months, days, selectDate, handleDateChange } = useMakeDate();

  return (
    <PopupLayout
      isOpen={isOpen}
      onClose={onClose}
      className="w-full gap-12 px-5 py-10 flex-col-center"
    >
      <div className="w-full gap-8 flex-col-center">
        <h2 className="text-h2-medium">기간 설정</h2>

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

      <Button onClick={onClose} size="big" className="h-11 w-full">
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default DateRangeBottomSheet;
