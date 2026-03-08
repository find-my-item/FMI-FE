import Link from "next/link";
import { QueryKey } from "@tanstack/react-query";
import { useDeleteComment } from "@/api/fetch/comment";
import { Icon, KebabMenuButton, ProfileAvatar } from "@/components/common";
import { formatDate } from "@/utils";

interface CommentMetaHeaderProps {
  data: {
    authorId: string;
    createdAt: string;
    authorName: string;
    profileImageUrl: string;
    commentId: number;
  };
  isGuest: boolean;
  isThreadItem: boolean;
  queryKey: QueryKey;
}

const authorStyle = "line-clamp-2 break-all text-body1-medium text-layout-header-default";

const CommentMetaHeader = ({ data, isGuest, isThreadItem, queryKey }: CommentMetaHeaderProps) => {
  const { authorId, createdAt, authorName, profileImageUrl, commentId } = data;
  const { mutate } = useDeleteComment(commentId, queryKey);

  const handleDelete = () => {
    mutate();
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

      <div className="relative">
        <KebabMenuButton size="small" ariaLabel="댓글 메뉴" disabled={isGuest} />

        <div className="absolute right-0 top-full mt-1">
          <button
            className="glass-card min-h-[57px] min-w-[182px] gap-2 text-nowrap rounded-[20px] border border-white px-7 py-4 bg-fill-neutral-subtle-default flex-center"
            onClick={handleDelete}
          >
            <Icon name="Trash" size={20} />
            <span className="text-h3-medium text-system-warning">댓글 삭제하기</span>
          </button>

          <div className="glass-card rounded-[20px] border border-white bg-fill-neutral-subtle-default">
            <button
              className="min-h-[57px] min-w-[182px] gap-2 text-nowrap px-7 py-4 flex-center"
              onClick={handleDelete}
            >
              <Icon name="UserReport" size={18} />
              <span className="text-h3-medium text-system-warning">작성자 신고하기</span>
            </button>
            <hr className="w-full border border-white" />
            <button
              className="min-h-[57px] min-w-[182px] gap-2 text-nowrap px-7 py-4 flex-center"
              onClick={handleDelete}
            >
              <Icon name="UserBlock" size={18} />
              <span className="text-h3-medium text-system-warning">작성자 차단하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentMetaHeader;
