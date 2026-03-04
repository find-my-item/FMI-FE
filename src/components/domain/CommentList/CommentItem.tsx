"use client";

import { useState } from "react";
import { Icon } from "@/components/common";
import { cn } from "@/utils";
import { CommentItemType } from "@/types";
import { CommentBody, CommentMeta, CommentActions, ReplyForm, CommentFooter } from "./_internal";

type CommentCardLevel = "comment" | "reply" | "nestedReply";

interface CommentCardProps {
  level?: CommentCardLevel;
  className?: string;
  data: CommentItemType;
}

const CommentItem = ({ level = "comment", className, data }: CommentCardProps) => {
  const isReply = level === "reply";
  const isNestedReply = level === "nestedReply";
  const isThreadItem = isReply || isNestedReply;

  const [viewReply, setViewReply] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const authorId = data.authorResponse ? String(data.authorResponse.id) : "";
  const authorName = data.authorResponse ? data.authorResponse.nickName : "";

  return (
    <div className={cn("my-[18px] px-5", className)}>
      <div className="flex">
        {isNestedReply && <Icon name="CommentReplyIcon" size={24} />}

        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex flex-col gap-3">
              <CommentMeta
                data={{ authorId, createdAt: data.createdAt, authorName }}
                isThreadItem={isThreadItem}
              />
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

      {viewReply && data.childrenCommentList && data.childrenCommentList.length > 0 && (
        <div className="rounded-[10px] bg-layout_2depth">
          {data.childrenCommentList.map((child, index) => (
            <CommentItem
              key={child.id}
              level={child.depth > 1 ? "nestedReply" : "reply"}
              className={index === 0 ? "pt-4" : undefined}
              data={child}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
