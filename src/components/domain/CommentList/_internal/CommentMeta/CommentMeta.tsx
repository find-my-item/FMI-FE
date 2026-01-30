import Link from "next/link";
import { KebabMenuButton, ProfileAvatar } from "@/components/common";
import { cn } from "@/utils";

interface CommentMetaHeaderProps {
  userId: string;
  isThreadItem: boolean;
}

const CommentMetaHeader = ({ userId, isThreadItem }: CommentMetaHeaderProps) => {
  return (
    <>
      {/* 댓글 메타 */}
      <div className="flex items-start justify-between">
        <div className="flex gap-[14px]">
          <ProfileAvatar size={isThreadItem ? 30 : 40} />
          <div
            className={cn(
              "flex flex-wrap items-start",
              isThreadItem ? "flex-row items-center gap-2" : "flex-col items-start"
            )}
          >
            <Link
              href={`user/${userId}`}
              className="line-clamp-2 break-all text-body1-medium text-layout-header-default"
            >
              asdfasdf
            </Link>
            <time dateTime="2025-05-06" className="text-body2-regular text-layout-body-default">
              2025.05.06
            </time>
          </div>
        </div>
        <KebabMenuButton size="small" ariaLabel="댓글 메뉴" />
      </div>
    </>
  );
};

export default CommentMetaHeader;
