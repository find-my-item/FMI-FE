"use client";

import MainCardList from "../MainCardList/MainCardList";
import { useMainKakaoMapStore } from "@/store";

const RecentFoundItemSection = () => {
  const { address } = useMainKakaoMapStore();

  return (
    <section className="space-y-2">
      <h2 className="space-x-1 py-2 pl-1 text-h3-semibold">
        <span className="text-brand-normal-default">{address}</span>
        <span className="text-neutral-strong-hover">최근 발견된 분실물</span>
      </h2>
      <MainCardList isLoading={false} />
    </section>
  );
};

export default RecentFoundItemSection;
