"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderSetting } from "@/components/layout/DetailHeader/DetailHeaderParts";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-[calc(100dvh-4px)] w-full flex-col">
      <h1 className="sr-only">알림 페이지</h1>
      <DetailHeader title="알림">
        <HeaderSetting />
      </DetailHeader>
      {children}
    </main>
  );
};

export default layout;
