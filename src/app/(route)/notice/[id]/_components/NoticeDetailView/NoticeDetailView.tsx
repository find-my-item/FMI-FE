"use client";

import { CommentList } from "@/components/domain";
import { MOCK_COMMENT_RESPONSE_DATA } from "@/mock/data";
import { NoticeCommentForm, NoticeDetailContent, NoticeDetailSkeleton } from "./_internal";
import { useGetNoticeDetail } from "@/api/fetch/notice";

const NoticeDetailView = ({ id }: { id: number }) => {
  const { data: noticeDetail, isLoading, isError } = useGetNoticeDetail({ id });

  // TODO(형준): 에러, 데이터 없을 때 처리 추가 필요
  if (isError) return null;

  return (
    <div className="flex flex-col h-base">
      {isLoading ? (
        <NoticeDetailSkeleton />
      ) : (
        <NoticeDetailContent noticeDetail={noticeDetail?.result} />
      )}
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
