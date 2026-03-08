"use client";

import { DetailHeader } from "@/components/layout";
import { NoticeView } from "./_components";
import { FloatingButton, ScrollToTopButton } from "@/components/common";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Notice = () => {
  const router = useRouter();

  return (
    <>
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">공지사항 목록</h1>
      <Suspense fallback="">
        <NoticeView />
      </Suspense>

      <div className="fixed bottom-[30px] right-6 space-y-2">
        <ScrollToTopButton />
        <FloatingButton
          ariaLabel="공지사항 작성 페이지 이동"
          mode="notice"
          onClick={() => router.push("/admin/notice/write")}
        />
      </div>
    </>
  );
};

export default Notice;
