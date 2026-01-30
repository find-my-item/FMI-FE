"use client";

import { useState } from "react";
import { cn } from "@/utils";
import { Icon, KebabMenuButton, ProfileAvatar } from "@/components/common";

interface CommentCardProps {
  isReply?: boolean;
  isReply2?: boolean;
  className?: string;
}

// TODO: 답글 작성란 추천 12 / 답글 수정
// TODO: 답글 더보기 추가
// TODO: 대댓글 유저 언급 표시

const CommentCard = ({ isReply, isReply2, className }: CommentCardProps) => {
  const [viewReply, setViewReply] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  return (
    <div className={cn("my-[18px] px-5", className)}>
      <div className={cn("flex", isReply && "gap-2")}>
        {isReply && <Icon name="CommentReplyIcon" size={24} />}

        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex flex-col gap-3">
              {/* 댓글 메타 */}
              <div className="flex items-start justify-between">
                <div className="flex gap-[14px]">
                  <ProfileAvatar size={isReply ? 30 : 40} />
                  <div
                    className={cn(
                      "flex items-start",
                      isReply ? "flex-row items-center gap-2" : "flex-col items-start"
                    )}
                  >
                    <p className="text-body1-medium text-layout-header-default">asdasdasd</p>
                    <time
                      dateTime="2025-05-06"
                      className="text-body2-regular text-layout-body-default"
                    >
                      2025.05.06
                    </time>
                  </div>
                </div>
                <KebabMenuButton size="small" ariaLabel="댓글 메뉴" />
              </div>
              {/* 댓글 내용 */}
              <p className="text-body1-regular text-layout-header-default">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ex omnis ullam
                maiores nihil consequuntur!
              </p>
            </div>
            {/* 댓글 좋아요 */}
            <button className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder">
              <Icon name="CommentLikeIcon" size={16} /> <span>추천 12</span>
            </button>
          </div>

          {/* 답글 */}
          <div className="flex items-center gap-3 py-2">
            <button
              className="flex items-center gap-1"
              onClick={() => setViewReply((prev) => !prev)}
            >
              <span
                className={cn(
                  "text-body1-medium",
                  isReply ? "text-brand-normal-enteredSelected" : "text-layout-header-default"
                )}
              >
                답글 <span>0</span>개
              </span>
              <Icon
                name="ArrowDownSmall"
                size={24}
                className={cn("transition-all", viewReply && "rotate-180")}
              />
            </button>
            <button
              className={cn(
                "text-neutral-strong-default",
                isReply2 ? "text-body1-regular" : "text-body1-medium",
                isReplyFormOpen && "text-[#0AA874]"
              )}
              onClick={() => setIsReplyFormOpen((prev) => !prev)}
            >
              답글
            </button>
          </div>
        </div>
      </div>

      {isReplyFormOpen && isReply2 && (
        <form action="" className="w-full">
          <input
            type="text"
            placeholder="답글 작성란"
            className={cn(
              "mt-2 w-full rounded-3xl px-4 py-[10px]",
              "bg-fill-neutral-normal-default placeholder:text-body1-medium placeholder:text-neutral-strong-placeholder"
            )}
          />
        </form>
      )}

      {viewReply && <CommentCard className="rounded-[10px] bg-layout_2depth p-4" isReply />}
    </div>
  );
};

export default CommentCard;
