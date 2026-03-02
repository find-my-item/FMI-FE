"use client";

import { CommentList } from "@/components/domain";
import { MOCK_COMMENT_LIST_DATA } from "@/mock/data";
import NoticeCommentForm from "./_internal/NoticeCommentForm";
import NoticeDetailContent from "./_internal/NoticeDetailContent";

const NoticeDetailView = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <NoticeDetailContent />
      <div className="border-b border-divider-default">
        <CommentList comments={MOCK_COMMENT_LIST_DATA} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto" />
      <NoticeCommentForm />
    </div>
  );
};

export default NoticeDetailView;
