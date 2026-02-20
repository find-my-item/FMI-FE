"use client";

import { useHorizontalDragScroll } from "@/hooks";
import Link from "next/link";

const RecentFoundItem = () => {
  return (
    <Link href="#" className="relative rounded-2xl border-[0.7px] border-divider-default">
      {/* TODO(형준): 이미지 컴포넌트로 변경 예정 */}
      <div className="h-[120px] w-[123px] rounded-2xl bg-slate-100" />
      <div className="absolute bottom-0 right-0 flex w-full flex-col gap-1 rounded-b-2xl bg-white px-3 py-[6px]">
        <span className="truncate text-caption1-semibold text-layout-header-default">
          습득물 제목 습득물 제목 습득물 제목
        </span>
        <time className="text-caption2-regular text-layout-body-default">2026-00-00</time>
      </div>
    </Link>
  );
};

const RecentFoundItemSection = () => {
  const { ref: scrollRef, onMouseDown } = useHorizontalDragScroll();

  return (
    <section className="space-y-2">
      <h2 className="py-2 pl-1 text-h3-semibold text-neutral-strong-hover">최근 습득된 분실물</h2>
      <div ref={scrollRef} onMouseDown={onMouseDown} className="-mr-5 flex gap-4 no-scrollbar">
        {Array.from({ length: 10 }).map((_, index) => (
          <RecentFoundItem key={index} />
        ))}
      </div>
    </section>
  );
};

export default RecentFoundItemSection;
