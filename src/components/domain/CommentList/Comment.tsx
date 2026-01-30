"use client";

import { useState } from "react";
import { Icon } from "@/components/common";
import { cn } from "@/utils";
import { CommentBody, CommentMeta, CommentActions, ReplyForm, CommentFooter } from "./_internal";

type CommentCardLevel = "comment" | "reply" | "nestedReply";

interface CommentCardProps {
  level?: CommentCardLevel;
  className?: string;
}

// TODO: 답글 더보기 추가

const COMMENT_MOCK_DATA = {
  id: "1",
  replyNickname: "a1",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ex omnis ullam maiores nihil consequuntur!",
};

const CommentCard = ({ level = "comment", className }: CommentCardProps) => {
  const isReply = level === "reply";
  const isNestedReply = level === "nestedReply";
  const isThreadItem = isReply || isNestedReply;

  const [viewReply, setViewReply] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  return (
    <div className={cn("my-[18px] px-5", className)}>
      <div className="flex">
        {isThreadItem && <Icon name="CommentReplyIcon" size={24} />}

        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex flex-col gap-3">
              <CommentMeta userId={COMMENT_MOCK_DATA.id} isThreadItem={isThreadItem} />
              <CommentBody isNestedReply={isNestedReply} commentData={COMMENT_MOCK_DATA} />
            </div>

            <CommentFooter
              isThreadItem={isThreadItem}
              isReplyFormOpen={isReplyFormOpen}
              setIsReplyFormOpen={setIsReplyFormOpen}
            />
          </div>

          <CommentActions
            isThreadItem={isThreadItem}
            isReplyFormOpen={isReplyFormOpen}
            setIsReplyFormOpen={setIsReplyFormOpen}
            viewReply={viewReply}
            setViewReply={setViewReply}
          />
        </div>
      </div>

      {isReplyFormOpen && <ReplyForm isThreadItem={isThreadItem} />}

      {viewReply && (
        <div className="rounded-[10px] bg-layout_2depth">
          <CommentCard level="comment" className="pt-4" />
          <CommentCard level="reply" />
          <CommentCard level="nestedReply" className="ml-2" />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
