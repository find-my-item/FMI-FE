"use client";

import { DetailHeader, Tab } from "@/components";
import { useState } from "react";

const USER_TABS = [
  { key: "post", label: "게시글" },
  { key: "comment", label: "댓글" },
  { key: "favorite", label: "즐겨찾기" },
] as const;

type SelectedTab = (typeof USER_TABS)[number]["key"];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("post");

  return (
    <div>
      <DetailHeader title="프로필">
        <DetailHeader.Menu />
      </DetailHeader>
      <h1 className="sr-only">타인 프로필</h1>

      <section className="flex items-center gap-6 p-5">
        <div className="h-[60px] w-[60px] rounded-full bg-gray-300" aria-hidden />
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-body1-semibold text-layout-header-default">사용자 닉네임</h2>
          <p className="text-body2-regular text-layout-body-default">asdf@gmail.com</p>
        </div>
      </section>

      <nav aria-label="프로필 탭">
        <Tab tabs={USER_TABS} selected={selectedTab} onValueChange={setSelectedTab} />
      </nav>

      <section className="p-5">
        {selectedTab === "post" && <div>게시글</div>}
        {selectedTab === "comment" && <div>댓글</div>}
        {selectedTab === "favorite" && <div>즐겨찾기</div>}
      </section>
    </div>
  );
}
