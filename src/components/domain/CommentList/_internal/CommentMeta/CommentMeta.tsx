import Link from "next/link";
import { KebabMenuButton, ProfileAvatar } from "@/components/common";
import { formatDate } from "@/utils";

interface CommentMetaHeaderProps {
  data: {
    authorId: string;
    createdAt: string;
    authorName: string;
  };
  isThreadItem: boolean;
}

const CommentMetaHeader = ({ data, isThreadItem }: CommentMetaHeaderProps) => {
  const { authorId, createdAt, authorName } = data;

  return (
    <>
      {/* 댓글 메타 */}
      <div className="flex items-start justify-between">
        <div className="flex gap-[14px]">
          {/* <ProfileAvatar src={"링크추가필요"} size={isThreadItem ? 30 : 40} /> */}
          <ProfileAvatar size={isThreadItem ? 30 : 40} />
          <div className="flex flex-col flex-wrap items-start">
            <Link
              href={`/user/${authorId}`}
              className="line-clamp-2 break-all text-body1-medium text-layout-header-default"
            >
              {authorName}
            </Link>
            <time dateTime={createdAt} className="text-body2-regular text-layout-body-default">
              {formatDate(createdAt)}
            </time>
          </div>
        </div>
        <KebabMenuButton size="small" ariaLabel="댓글 메뉴" />
      </div>
    </>
  );
};

export default CommentMetaHeader;
