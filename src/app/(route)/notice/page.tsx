"use client";

import { DetailHeader } from "@/components/layout";
import { NoticeFilter, NoticeSearchForm, NoticeView, NoticeListErrorButtons } from "./_components";
import { FloatingButton, ScrollToTopButton } from "@/components/common";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useSearchUpdateQueryString } from "@/hooks";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { ErrorState } from "@/components/state";

const NoticePageContent = () => {
  const { searchUpdateQuery } = useSearchUpdateQueryString();

  return (
    <>
      <NoticeSearchForm />
      <NoticeFilter searchUpdateQuery={searchUpdateQuery} />

      <ErrorBoundary
        fallback={
          <ErrorState
            icon={{ iconName: "NoReports", iconSize: 70 }}
            title="공지사항을 불러올 수 없어요"
            description={"네트워크 연결을 확인하거나\n잠시 후 다시 시도해주세요"}
          >
            <NoticeListErrorButtons />
          </ErrorState>
        }
      >
        <NoticeView />
      </ErrorBoundary>
    </>
  );
};

const Notice = () => {
  const router = useRouter();

  return (
    <div className="min-h-dvh">
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">공지사항 목록</h1>
      <Suspense fallback="">
        <NoticePageContent />
      </Suspense>

      <div className="fixed bottom-[30px] right-6 space-y-2">
        <ScrollToTopButton />
        <FloatingButton
          ariaLabel="공지사항 작성 페이지 이동"
          mode="notice"
          onClick={() => router.push("/admin/notice/write")}
        />
      </div>
    </div>
  );
};

export default Notice;
