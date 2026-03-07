import Link from "next/link";
import { KebabMenuButton, ProfileAvatar } from "@/components/common";
import { formatDate } from "@/utils";

interface CommentMetaHeaderProps {
  data: {
    authorId: string;
    createdAt: string;
    authorName: string;
    profileImageUrl: string;
  };
  isGuest: boolean;
  isThreadItem: boolean;
}

const authorStyle = "line-clamp-2 break-all text-body1-medium text-layout-header-default";

const CommentMetaHeader = ({ data, isGuest, isThreadItem }: CommentMetaHeaderProps) => {
  const { authorId, createdAt, authorName, profileImageUrl } = data;

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

      <KebabMenuButton size="small" ariaLabel="댓글 메뉴" disabled={isGuest} />
    </div>
  );
};

export default CommentMetaHeader;
