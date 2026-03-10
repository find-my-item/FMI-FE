"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, KebabMenuButton, ProfileAvatar } from "@/components/common";
import { cn, formatDate } from "@/utils";
import { useClickOutside } from "@/hooks";
import { DeleteCommentVariables } from "@/api/fetch/comment";
import { QueryKey } from "@tanstack/react-query";
import { IconName } from "@/components/common/Icon/Icon";

interface CommentMetaHeaderProps {
  data: {
    authorId: string;
    createdAt: string;
    authorName: string;
    profileImageUrl: string;
    commentId: number;
    deleted: boolean;
    canDelete: boolean;
  };
  isGuest: boolean;
  isThreadItem: boolean;
  queryKey: QueryKey;
  onDeleteComment: (commentVariables: DeleteCommentVariables) => void;
}

const authorStyle = "line-clamp-2 break-all text-body1-medium text-layout-header-default";

const CommentMetaHeader = ({
  data,
  isGuest,
  isThreadItem,
  queryKey,
  onDeleteComment,
}: CommentMetaHeaderProps) => {
  const { authorId, createdAt, authorName, profileImageUrl, commentId, deleted, canDelete } = data;

  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const ref = useClickOutside(() => setIsKebabMenuOpen(false));

  const handleDeleteComment = () => {
    onDeleteComment?.({ commentId, queryKey });
    setIsKebabMenuOpen(false);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-[14px]">
        <ProfileAvatar src={profileImageUrl} size={isThreadItem ? 30 : 40} />

        <div className="flex flex-col flex-wrap items-start">
          {isGuest ? (
            <span className={authorStyle}>{authorName}</span>
          ) : (
            <Link href={`/user/${authorId}`} className={authorStyle}>
              {authorName}
            </Link>
          )}

          <time dateTime={createdAt} className="text-body2-regular text-layout-body-default">
            {formatDate(createdAt)}
          </time>
        </div>
      </div>

      <div ref={ref} className="relative">
        <KebabMenuButton
          size="small"
          ariaLabel={isKebabMenuOpen ? "댓글 메뉴 닫기" : "댓글 메뉴 열기"}
          disabled={isGuest}
          onClick={() => setIsKebabMenuOpen((prev) => !prev)}
        />

        {isKebabMenuOpen && (
          <div className="absolute right-0 top-full z-10 mt-1">
            {canDelete ? (
              <button
                className={cn(
                  "glass-card min-h-[57px] min-w-[182px] gap-2 text-nowrap rounded-[20px] border px-7 py-4 flex-center",
                  "border-white bg-fill-neutral-subtle-default",
                  deleted && "cursor-not-allowed"
                )}
                onClick={handleDeleteComment}
                disabled={deleted}
              >
                <Icon name="Trash" size={20} />
                <span className="text-h3-medium text-system-warning">댓글 삭제하기</span>
              </button>
            ) : (
              <div className="glass-card rounded-[20px] border border-white bg-fill-neutral-subtle-default">
                <MenuItem icon="UserReport" label="작성자 신고하기" onClick={() => {}} />

                <hr className="w-full border border-white" />

                <MenuItem icon="UserBlock" label="작성자 차단하기" onClick={() => {}} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentMetaHeader;

const MenuItem = ({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: IconName;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className="min-h-[57px] min-w-[182px] gap-2 text-nowrap px-7 py-4 flex-center"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name={icon} size={18} />
      <span className="text-h3-medium text-system-warning">{label}</span>
    </button>
  );
};
