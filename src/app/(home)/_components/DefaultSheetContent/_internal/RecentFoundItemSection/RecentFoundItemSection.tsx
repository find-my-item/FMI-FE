"use client";

import { Icon } from "@/components/common";
import { useHorizontalDragScroll } from "@/hooks";
import Image from "next/image";
import Link from "next/link";

const RecentFoundItem = () => {
  return (
    <Link href="#" className="relative rounded-2xl border-[0.7px] border-divider-default">
      <div className="h-[120px] w-[123px] rounded-2xl bg-fill-neutralInversed-normal-preesed">
        <div className="relative flex h-full w-full justify-center">
          <Icon name="LogoCharacter" size={65} />
          {/* TODO(형준): 이미지 예시 임시 주석처리 */}
          {/* <Image
            src="https://i.namu.wiki/i/HXXV8jiIlE0t9EoBXsyfG-ltpGEqnc620PzNjD6G_aYP74irttmRysvhQlYX0lEVSWFEt3icEL0RU6R_jE1URg.webp"
            alt="thumbnail"
            fill
            className="rounded-2xl object-cover"
          /> */}
        </div>
      </div>
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
      <h2 className="space-x-1 py-2 pl-1 text-h3-semibold">
        <span className="text-brand-normal-default">OO동</span>
        <span className="text-neutral-strong-hover">최근 발견된 분실물</span>
      </h2>
      <div ref={scrollRef} onMouseDown={onMouseDown} className="-mx-5 flex gap-4 px-5 no-scrollbar">
        {Array.from({ length: 10 }).map((_, index) => (
          <RecentFoundItem key={index} />
        ))}
      </div>
    </section>
  );
};

export default RecentFoundItemSection;
