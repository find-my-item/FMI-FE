"use client";

import { useState } from "react";
import { DeleteCommentVariables, useGetRepliesPostsComments } from "@/api/fetch/comment";
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
  autoOpenReplies?: boolean;

  useFetchReplies: typeof useGetRepliesPostsComments;
  onDeleteComment: (commentVariables: DeleteCommentVariables) => void;

  isGuest?: boolean;
}

const CommentItem = ({
  level = "comment",
  className,
  data,
  postId,
  onSubmit,
  isPending,
  autoOpenReplies = false,
  useFetchReplies,
  isGuest = false,
  onDeleteComment,
}: CommentCardProps) => {
  const isReply = level === "reply";
  const isNestedReply = level === "nestedReply";
  const isThreadItem = isReply || isNestedReply;
  const isTopLevelComment = level === "comment";

  const [viewReply, setViewReply] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const shouldFetchReplies = (isTopLevelComment && viewReply) || (isReply && autoOpenReplies);

  const { data: replyCommentData } = useFetchReplies({
    commentId: data.id,
    enabled: !isGuest && shouldFetchReplies,
  });

  const handleReplySubmit = (content: string, image: File | null) => {
    onSubmit?.(content, image, data.id);
    setViewReply(true);
    setIsReplyFormOpen(false);
  };

  const authorId = data.authorResponse ? String(data.authorResponse.userId) : "";
  const authorName = data.authorResponse ? data.authorResponse.nickName : "";
  const profileImageUrl = data.authorResponse ? data.authorResponse.profileImageUrl : "";

  const replyComments = replyCommentData?.result?.comments ?? [];
  const isRepliesVisible = shouldFetchReplies;
  const hasReplyComments = isRepliesVisible && replyComments.length > 0;

  const queryKey =
    level === "comment" ? ["post-comments", postId] : ["replies-post-comments", data.id];

  return (
    <li className={cn("my-[18px]", !isNestedReply && "px-5", className)}>
      <div className="flex">
        {isNestedReply && <Icon name="CommentReplyIcon" size={24} className="text-[#D9D9D9]" />}

        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex flex-col gap-3">
              <CommentMeta
                data={{
                  authorId,
                  createdAt: data.createdAt,
                  authorName,
                  profileImageUrl,
                  commentId: data.id,
                  deleted: data.deleted,
                }}
                isGuest={isGuest}
                isThreadItem={isThreadItem}
                queryKey={queryKey}
                onDeleteComment={onDeleteComment}
              />

              <CommentBody
                bodyData={{
                  replyNickname: data.authorResponse.nickName,
                  content: data.content,
                }}
                isNestedReply={isNestedReply}
              />
            </div>

            <CommentFooter
              footerData={{ likeCount: data.likeCount, id: data.id, isLike: data.isLike }}
              isThreadItem={isThreadItem}
              isGuest={isGuest}
              isReplyFormOpen={isReplyFormOpen}
              setIsReplyFormOpen={setIsReplyFormOpen}
              queryKey={queryKey}
              deleted={data.deleted}
            />
          </div>

          <CommentActions
            isThreadItem={isThreadItem}
            isReplyFormOpen={isReplyFormOpen}
            setIsReplyFormOpen={setIsReplyFormOpen}
            viewReply={isTopLevelComment ? viewReply : autoOpenReplies}
            setViewReply={setViewReply}
            replyCount={data.childCommentCount || 0}
            isGuest={isGuest}
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
              className={index === 0 && child.depth === 1 ? "pt-4" : undefined}
              data={child}
              onSubmit={onSubmit}
              isPending={isPending}
              autoOpenReplies={isTopLevelComment && viewReply}
              useFetchReplies={useFetchReplies}
              isGuest={isGuest}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;
