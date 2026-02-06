"use client";

import { useState } from "react";
import { Icon } from "@/components/common";
import { cn } from "@/utils";
import { MOCK_COMMENT_ITEM_DATA } from "@/mock/data";
import { CommentBody, CommentMeta, CommentActions, ReplyForm, CommentFooter } from "./_internal";

type CommentCardLevel = "comment" | "reply" | "nestedReply";

interface CommentCardProps {
  level?: CommentCardLevel;
  className?: string;
}

const data = MOCK_COMMENT_ITEM_DATA;

const CommentItem = ({ level = "comment", className }: CommentCardProps) => {
  const isReply = level === "reply";
  const isNestedReply = level === "nestedReply";
  const isThreadItem = isReply || isNestedReply;

  const [viewReply, setViewReply] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  return (
    <div className={cn("my-[18px] px-5", className)}>
      <div className="flex">
        {isNestedReply && <Icon name="CommentReplyIcon" size={24} />}

        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex flex-col gap-3">
              <CommentMeta data={data} isThreadItem={isThreadItem} />
              <CommentBody bodyData={{ content: data.content }} isNestedReply={isNestedReply} />
            </div>

            <CommentFooter
              footerData={{ likeCount: data.likeCount, id: data.id }}
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

      {isReplyFormOpen && (
        <ReplyForm isThreadItem={isThreadItem} className={isNestedReply ? "pb-[7px]" : undefined} />
      )}

      {viewReply && (
        <div className="rounded-[10px] bg-layout_2depth">
          <CommentItem level="reply" className="pt-4" />
          <CommentItem level="nestedReply" />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
