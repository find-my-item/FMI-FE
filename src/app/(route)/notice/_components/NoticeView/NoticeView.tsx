"use client";

import NoticeList from "../NoticeList/NoticeList";
import { useGetNotices } from "@/api/fetch/notice";
import { useInfiniteScroll } from "@/hooks";
import { Suspense } from "react";
import NoticeListSkeleton from "./_internal/NoticeListSkeleton";

const NoticeContent = () => {
  const { data: notices, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNotices();
  const { ref: noticeListRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="h-base">
      {notices && notices.length > 0 && <NoticeList notices={notices} />}
      {hasNextPage && <div ref={noticeListRef} className="h-[100px]" />}
    </div>
  );
};

const NoticeView = () => {
  return (
    <Suspense fallback={<NoticeListSkeleton />}>
      <NoticeContent />
    </Suspense>
  );
};

export default NoticeView;
