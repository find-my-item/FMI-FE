"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderSetting } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "알림",
//   description: "찾아줘에서 나에게 온 알림을 확인해보세요.",
// };

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
