"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import { cn } from "@/utils";
import { getDaysInMonth } from "date-fns";
import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { MYPAGE_POSTS_SHEET_FILTER } from "../../_constants/MYPAGE_POSTS_SHEET_FILTER";

// ----------------------------------------------------------------------
// 1. [재사용 컴포넌트] Wheel (각 컬럼 역할)
// ----------------------------------------------------------------------
interface WheelProps {
  data: number[];
  selected: number;
  onSelected: (val: number) => void;
  label?: string; // "년", "월", "일" 텍스트
}

const Wheel = ({
  data,
  selected,
  onSelected,
  label,
}: {
  data: number[];
  selected: number;
  onSelected: (value: number) => void;
  label?: string;
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // 데이터가 바뀌거나 초기값 변경 시 슬라이드 위치 동기화
  useEffect(() => {
    if (swiperInstance && !swiperInstance.destroyed) {
      const index = data.indexOf(selected);
      if (index !== -1 && swiperInstance.activeIndex !== index) {
        swiperInstance.slideTo(index);
      }
    }
  }, [selected, data, swiperInstance]);

  return (
    <div className="relative flex h-[140px] w-full flex-1 items-center justify-center overflow-hidden">
      {/* 중앙 하이라이트 (원하는 디자인으로 커스텀 가능!) */}
      {/* 여기서는 회색 박스를 배경에 깔아서 '선택된 느낌'을 줍니다. 테두리가 싫으시면 이걸 수정하세요. */}
      <div className="absolute left-0 right-0 h-[40px] rounded-lg bg-neutral-100/50" />

      <Swiper
        direction="vertical"
        slidesPerView={3} // 한 화면에 3개 정도 보이게
        centeredSlides={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => onSelected(data[swiper.activeIndex])}
        initialSlide={data.indexOf(selected)}
        className="h-full w-full"
        modules={[Mousewheel]}
        //  2. 마우스 휠 활성화 및 감도 조절
        mousewheel={{
          forceToAxis: true, // 세로 스크롤만 허용 (가로 스크롤 방지)
          sensitivity: 0.5, // 휠 감도 조절 (너무 빠르면 낮추세요)
          thresholdDelta: 10, // 작은 떨림 무시
        }}
      >
        {data.map((item) => (
          <SwiperSlide
            key={item}
            className="flex items-center justify-center text-[20px] font-medium text-neutral-400 transition-colors [&.swiper-slide-active]:font-bold [&.swiper-slide-active]:text-black"
          >
            {/* 선택된 녀석(swiper-slide-active)만 글자색 진하게, 굵게 */}
            {item}
            {label && <span className="ml-1 text-sm font-normal">{label}</span>}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

interface MypagePostsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "Date" | "Filter";
}

const MypagePostsBottomSheet = ({ isOpen, onClose, mode }: MypagePostsBottomSheetProps) => {
  const today = new Date();

  // 통합 상태 관리
  const [selectDate, setSelectDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

  // 데이터 배열 생성 (Memo)
  const years = useMemo(() => {
    const startYear = 2020;
    return Array.from({ length: today.getFullYear() - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  const days = useMemo(() => {
    const date = new Date(selectDate.year, selectDate.month - 1);
    const daysCount = getDaysInMonth(date);
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  }, [selectDate.year, selectDate.month]);

  // 핸들러: 값 변경 시 즉시 반영 + 일수 보정
  const handleDateChange = (type: "year" | "month" | "day", value: number) => {
    setSelectDate((prev) => {
      const newData = { ...prev, [type]: value };

      // 연/월 변경 시, 일이 범위를 넘어가면 보정 (예: 2월 30일 -> 2월 28일)
      if (type !== "day") {
        const maxDay = getDaysInMonth(new Date(newData.year, newData.month - 1));
        if (newData.day > maxDay) {
          newData.day = maxDay;
        }
      }
      return newData;
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
            <Filter ariaLabel="시작일" onSelected={true} className="px-10 py-2">
              시작일
            </Filter>
            <Filter ariaLabel="종료일" onSelected={false}>
              종료일
            </Filter>
          </div>

          <div className="flex w-full items-center justify-between px-4">
            <Wheel
              data={years}
              selected={selectDate.year}
              onSelected={(val) => handleDateChange("year", val)}
            />

            <Wheel
              data={months}
              selected={selectDate.month}
              onSelected={(val) => handleDateChange("month", val)}
              label="월"
            />

            <Wheel
              data={days}
              selected={selectDate.day}
              onSelected={(val) => handleDateChange("day", val)}
              label="일"
            />
          </div>
        </div>
      )}

      {/* Filter 영역 (기존 코드 유지) */}
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
