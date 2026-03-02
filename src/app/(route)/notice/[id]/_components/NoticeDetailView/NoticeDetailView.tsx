"use client";

import { CommentList } from "@/components/domain";
import { MOCK_COMMENT_LIST_DATA } from "@/mock/data";
import NoticeCommentForm from "./_internal/NoticeCommentForm";
import NoticeDetailContent from "./_internal/NoticeDetailContent";

const NoticeDetailView = () => {
  return (
    <>
      <NoticeDetailContent />
      <CommentList comments={MOCK_COMMENT_LIST_DATA} />
      <NoticeCommentForm />
    </>
  );
};

export default NoticeDetailView;
