"use client";

import { CommentList } from "@/components/domain";
import { MOCK_COMMENT_RESPONSE_DATA } from "@/mock/data";
import { NoticeCommentForm, NoticeDetailContent, NoticeDetailSkeleton } from "./_internal";
import { useGetNoticeDetail } from "@/api/fetch/notice";
import { useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const NoticeDetailView = ({ id }: { id: number }) => {
  const { data: noticeDetail, isLoading, isError } = useGetNoticeDetail({ id });
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      addToast("공지사항 불러오기에 실패했어요", "error");
      router.replace("/notice");
    }
  }, [isError]);

  return (
    <div className="flex flex-col h-base">
      {isLoading && <NoticeDetailSkeleton />}
      {noticeDetail && !isLoading && <NoticeDetailContent noticeDetail={noticeDetail?.result} />}
      <CommentList
        postId={id}
        onSubmit={() => {}}
        isPending={false}
        comments={MOCK_COMMENT_RESPONSE_DATA}
      />
      <hr className="border border-divider-default" />
      <NoticeCommentForm />
    </div>
  );
};

export default NoticeDetailView;
