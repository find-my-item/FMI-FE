"use client";

import { Chip, Icon } from "@/components/common";
import { useHorizontalDragScroll } from "@/hooks";
import Link from "next/link";
import PublicMoreViewCard from "./PublicMoreViewCard";
import Image from "next/image";
import RecentFoundItemSkeleton from "../RecentFoundItemSection/RecentFoundItemSkeleton";

interface MainCardProps {
  showChip: boolean;
}

const MainCard = ({ showChip }: MainCardProps) => {
  return (
    <Link href="#" className="relative rounded-2xl border-[0.7px] border-divider-default">
      <div className="h-[120px] w-[123px] rounded-2xl bg-fill-neutralInversed-normal-preesed">
        <div className="relative flex h-full w-full justify-center">
          {/* TODO(형준): 이미지 없을 때 Icon, 있을 때 Image 사용 */}
          {/* <Image
            src="https://i.namu.wiki/i/HXXV8jiIlE0t9EoBXsyfG-ltpGEqnc620PzNjD6G_aYP74irttmRysvhQlYX0lEVSWFEt3icEL0RU6R_jE1URg.webp"
            alt="thumbnail"
            fill
            className="rounded-2xl object-cover"
          /> */}
          <Icon name="LogoCharacter" size={65} />
          {showChip && (
            <div className="absolute left-2 top-2">
              <Chip label="경찰청" className="!px-2" />
            </div>
          )}
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

interface MainCardListProps {
  mode?: "recent" | "public";
  isLoading: boolean;
}

// TODO(형준): 데이터 props/type 추가 필요
const MainCardList = ({ mode = "recent", isLoading = false }: MainCardListProps) => {
  const { ref: scrollRef, onMouseDown } = useHorizontalDragScroll();

  const isPublicMode = mode === "public";

  return (
    <div ref={scrollRef} onMouseDown={onMouseDown} className="-mx-5 flex gap-4 px-5 no-scrollbar">
      {isLoading ? (
        <RecentFoundItemSkeleton />
      ) : (
        Array.from({ length: 10 }).map((_, index) => (
          <MainCard key={index} showChip={isPublicMode} />
        ))
      )}
      {isPublicMode && <PublicMoreViewCard />}
    </div>
  );
};

export default MainCardList;
