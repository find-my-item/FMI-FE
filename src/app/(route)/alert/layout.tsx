"use client";

import { DetailHeader } from "@/components/layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-[calc(100dvh-4px)] w-full flex-col">
      <h1 className="sr-only">알림 페이지</h1>
      <DetailHeader title="알림">
        <DetailHeader.Setting />
      </DetailHeader>
      {children}
    </main>
  );
};

export default layout;
