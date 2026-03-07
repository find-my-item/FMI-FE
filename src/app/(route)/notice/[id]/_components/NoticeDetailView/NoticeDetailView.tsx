"use client";

import { CommentList } from "@/components/domain";
import { MOCK_COMMENT_RESPONSE_DATA } from "@/mock/data";
import { NoticeCommentForm, NoticeDetailContent } from "./_internal";

const NoticeDetailView = () => {
  return (
    <div className="flex flex-col h-base">
      <NoticeDetailContent />
      <CommentList comments={MOCK_COMMENT_RESPONSE_DATA} />
      <hr className="border border-divider-default" />
      <NoticeCommentForm />
    </div>
  );
};

export default NoticeDetailView;
