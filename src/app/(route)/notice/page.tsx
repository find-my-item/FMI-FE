"use client";

import { DetailHeader } from "@/components/layout";
import { NoticeFilter, NoticeSearchForm, NoticeView } from "./_components";
import { FloatingButton, ScrollToTopButton } from "@/components/common";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useSearchUpdateQueryString } from "@/hooks";

const Notice = () => {
  const router = useRouter();
  const { searchUpdateQuery } = useSearchUpdateQueryString();

  return (
    <>
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">공지사항 목록</h1>
      <Suspense fallback="">
        <NoticeSearchForm />
        <NoticeFilter searchUpdateQuery={searchUpdateQuery} />
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
