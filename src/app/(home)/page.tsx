"use client";

import { BaseKakaoMap } from "@/components/domain";
import { BottomSheet } from "./_components";
import SideBar from "@/components/layout/Header/_internal/SideBar";
import { useState } from "react";
import { Icon } from "@/components/common";
import { Header } from "@/components/layout";

// TODO(형준): 임시 사이드바 추가, 향후 제거
const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-dvh">
      <Header />
      <button onClick={() => setIsOpen(!isOpen)} className="absolute right-[410px] select-none">
        <Icon name="Menu" title="메뉴 열기" />
      </button>
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
      <BottomSheet />
    </div>
  );
};

export default Page;
