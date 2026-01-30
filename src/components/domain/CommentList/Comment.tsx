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
// TODO: 대댓글 유저 언급 표시

let userId = "1";

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
              <CommentMeta userId={userId} isThreadItem={isThreadItem} />
              <CommentBody />
            </div>

            <CommentFooter
              isThreadItem={isThreadItem}
              isReplyFormOpen={isReplyFormOpen}
              setIsReplyFormOpen={setIsReplyFormOpen}
            />
          </div>

          {/* 답글 */}
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
