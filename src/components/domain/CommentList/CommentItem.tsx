"use client";

import { useState } from "react";
import { useGetRepliesPostsComments } from "@/api/fetch/comment";
import { Icon } from "@/components/common";
import { cn } from "@/utils";
import { CommentItemType } from "@/types";
import { CommentBody, CommentMeta, CommentActions, CommentFooter, ReplyForm } from "./_internal";

type CommentCardLevel = "comment" | "reply" | "nestedReply";

interface CommentCardProps {
  level?: CommentCardLevel;
  className?: string;
  data: CommentItemType;
  postId: number;
  onSubmit?: (content: string, image: File | null, parentId: number) => void;
  isPending?: boolean;

  useFetchReplies: typeof useGetRepliesPostsComments;
}

const CommentItem = ({
  level = "comment",
  className,
  data,
  postId,
  onSubmit,
  isPending,
  useFetchReplies,
}: CommentCardProps) => {
  const isReply = level === "reply";
  const isNestedReply = level === "nestedReply";
  const isThreadItem = isReply || isNestedReply;

  const [viewReply, setViewReply] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const { data: replyCommentData } = useFetchReplies({
    commentId: data.id,
    enabled: viewReply,
  });

  const handleReplySubmit = (content: string, image: File | null) => {
    onSubmit?.(content, image, data.id);
    setViewReply(true);
    setIsReplyFormOpen(false);
  };

  const authorId = data.authorResponse ? String(data.authorResponse.userId) : "";
  const authorName = data.authorResponse ? data.authorResponse.nickName : "";

  const replyComments = replyCommentData?.result?.comments ?? [];
  const hasReplyComments = viewReply && replyComments.length > 0;

  return (
    <li className={cn("my-[18px] px-5", className)}>
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
              footerData={{ likeCount: data.likeCount, id: data.id, isLike: data.isLike }}
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
            replyCount={data.childCommentCount || 0}
          />
        </div>
      </div>

      {isReplyFormOpen && (
        <ReplyForm
          isThreadItem={isThreadItem}
          className={isNestedReply ? "pb-[7px]" : undefined}
          onSubmit={handleReplySubmit}
          isPending={isPending}
        />
      )}

      {hasReplyComments && (
        <ul className="rounded-[10px] bg-layout_2depth">
          {replyComments.map((child, index) => (
            <CommentItem
              key={child.id}
              postId={postId}
              level={child.depth > 1 ? "nestedReply" : "reply"}
              className={index === 0 ? "pt-4" : undefined}
              data={child}
              useFetchReplies={useFetchReplies}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;
