"use client";

import { CommentList } from "@/components/domain";
import { NoticeCommentForm, NoticeDetailContent, NoticeDetailSkeleton } from "./_internal";
import { useGetNoticeDetail } from "@/api/fetch/notice";
import { useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { useGetUsersMe } from "@/api/fetch/user";
import {
  useDeleteNoticeComment,
  useGetNoticeComment,
  useGetRepliesNoticeComment,
} from "@/api/fetch/noticeComment";
import { DeleteCommentVariables } from "@/api/fetch/comment";

const NoticeDetailView = ({ id }: { id: number }) => {
  const { data: noticeDetail, isLoading, isError } = useGetNoticeDetail({ id });
  const { addToast } = useToast();
  const router = useRouter();

  const { data: userData } = useGetUsersMe();
  const isLoggedIn = !!userData?.result;

  const { data: noticeComments, fetchNextPage } = useGetNoticeComment({
    noticeId: id,
    enabled: isLoggedIn,
  });

  const { mutate: deleteNoticeComment } = useDeleteNoticeComment();

  useEffect(() => {
    if (isError) {
      addToast("공지사항 불러오기에 실패했어요", "error");
      router.replace("/notice");
    }
  }, [isError]);

  const handleDeleteComment = ({ commentId, queryKey }: DeleteCommentVariables) => {
    const firstKey = Array.isArray(queryKey) ? queryKey[0] : undefined;
    const invalidateQueryKey =
      firstKey === "replies-post-comments"
        ? ["replies-notice-comments", commentId]
        : ["notice-comments", id];

    deleteNoticeComment({ commentId, queryKey: invalidateQueryKey });
  };

  return (
    <div className="flex flex-col h-base">
      {isLoading && <NoticeDetailSkeleton />}
      {noticeDetail && !isLoading && <NoticeDetailContent noticeDetail={noticeDetail?.result} />}
      <CommentList
        postId={id}
        onSubmit={() => {}}
        isPending={false}
        isLoggedIn={isLoggedIn}
        comments={noticeComments}
        useFetchReplies={useGetRepliesNoticeComment}
        onCommentLoadMore={() => fetchNextPage()}
        onDeleteComment={handleDeleteComment}
        onFavoriteComment={() => {}}
      />
      <hr className="border border-divider-default" />
      <NoticeCommentForm />
    </div>
  );
};

export default NoticeDetailView;
