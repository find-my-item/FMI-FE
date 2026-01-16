import { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { cn } from "@/utils";
import { Filter } from "@/components/common";
import useMakeDate from "./_hooks/useMakeDate";

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
              // 디자인 토큰 수정 필요
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

const DateRangeSheet = () => {
  const { years, months, days, selectDate, handleDateChange } = useMakeDate();

  return (
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
  );
};

export default DateRangeSheet;
