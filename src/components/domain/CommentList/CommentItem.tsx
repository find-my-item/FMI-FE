"use client";

import { useState } from "react";
import { Bookmark, Icon, KebabMenuButton, ProfileAvatar, ViewMoreReply } from "@/components/common";
import { cn } from "@/utils";
import type { Comment } from "./types/commentItem";
import CommentCard from "./Comment";

interface CommentItemProps {
  comment: Comment;
  replies?: Comment[];
}

const CommentItem = ({ comment, replies = [] }: CommentItemProps) => {
  const [viewReply, setViewReply] = useState(false);

  const handleViewReply = () => {
    setViewReply((prev) => !prev);
  };

  const hasReplies = replies.length > 0;

  return (
    <>
      {/* <section
        className={cn(
          "space-y-[8px] px-[20px]",
          comment.replyTo ? "pl-[30px] pr-[20px] pt-[8px]" : "px-[20px] pt-[24px]"
        )}
      >
        <div className="flex items-start justify-between gap-[16px]">
          <div className="flex gap-[14px]">
            <ProfileAvatar src={comment.authorImage} alt={comment.author} size={40} />
            <div className="flex flex-col justify-center gap-[2px]">
              <p className="text-body1-medium text-layout-header-default">{comment.author}</p>
              <time className="text-body2-regular text-layout-body-default">{comment.date}</time>
            </div>
          </div>
          <KebabMenuButton size="small" ariaLabel="댓글 메뉴" />
        </div>

        <p className="text-body1-regular text-[#242424]">
          {comment.replyTo && <span className="mr-1 text-green-600">@{comment.replyTo}</span>}
          {comment.content}
        </p>

        <div className="flex items-center gap-1">
          <Bookmark isActive size="small" />
          <div className="flex items-center gap-[12px]">
            <span className="text-body2-regular text-neutral-strong-placeholder">좋아요 12</span>
            {comment.replyTo && (
              <button className="text-body2-medium text-neutral-strong-default hover:text-black active:text-[#9D9D9D] disabled:text-[#9D9D9D]">
                답글 쓰기
              </button>
            )}
          </div>
        </div>
        {comment.replyTo ? (
          <button className="flex items-center gap-1 pb-[8px] pt-[4px]">
            <span className="text-body1-medium text-brand-subtle-default active:text-[#6ED5A7] disabled:text-[#98E3BD]">
              답글 더보기
            </span>
            <Icon name="ArrowDown" size={18} />
          </button>
        ) : hasReplies ? (
          <ViewMoreReply
            onViewMore={handleViewReply}
            onWriteReply={() => {}}
            text={`답글 ${replies.length}개`}
          />
        ) : (
          <button className="text-body1-medium text-[#5D5D5D] hover:text-black active:text-[#9D9D9D] disabled:text-[#9D9D9D]">
            답글 쓰기
          </button>
        )}
      </section> */}
      <CommentCard />
      <CommentCard isReply />

      {!comment.replyTo && viewReply && hasReplies && (
        <div>
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentItem;
