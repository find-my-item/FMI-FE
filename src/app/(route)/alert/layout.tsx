"use client";

import { DetailHeader } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-[calc(100dvh-4px)] w-full flex-col">
      <DetailHeader title="알림">
        <DetailHeader.Setting />
      </DetailHeader>
      {children}
    </main>
  );
};

export default layout;
