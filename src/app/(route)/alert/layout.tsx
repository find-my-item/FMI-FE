"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderSetting } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <main className="flex w-full flex-col h-base">
      <h1 className="sr-only">알림 페이지</h1>
      <DetailHeader title="알림">
        <HeaderSetting onClick={() => router.push("/mypage/notifications")} />
      </DetailHeader>
      {children}
    </main>
  );
};

export default layout;
