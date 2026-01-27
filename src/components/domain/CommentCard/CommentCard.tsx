import { Icon, ListItemImage } from "@/components/common";
import { CommentCardType } from "@/types";
import { formatDate } from "@/utils";

/**
 * @author suhyeon
 *
 * 댓글 카드 컴포넌트입니다.
 *
 * @param data - 댓글 카드 컴포넌트 데이터
 *
 * @example
 * ```tsx
 * <CommentCard
 *   data={
 *     commentId: 1,
 *     mentionUser: "suhyeon",
 *     comment: "댓글 내용이 들어갑니다.",
 *     createdAt: "2025-12-26T10:22:58",
 *     like: 4,
 *     thumbnailUrl: "https://picsum.photos/400/300?random=2",
 *   }
 * >
 * ```
 */

interface CommentCardProps {
  data: CommentCardType;
}

const CommentCard = ({ data }: CommentCardProps) => {
  const { createdAt, mentionUser, thumbnailUrl, comment, like } = data;

  return (
    <li className="flex w-full justify-between border-b border-divider-default px-5 py-[30px]">
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="w-full truncate">
          {mentionUser && <span className="mr-1 text-brand-normal-default"> @{mentionUser}</span>}
          {comment}
        </p>

        <span className="mt-1 text-body2-regular text-layout-body-default">
          {formatDate(createdAt)}
        </span>

        <span className="mt-2 flex gap-1 text-body2-regular text-neutral-strong-placeholder">
          <Icon name="Heart" size={16} />
          {like}
        </span>
      </div>

      {thumbnailUrl && <ListItemImage src={thumbnailUrl} alt="댓글 이미지" size={90} />}
    </li>
  );
};

export default CommentCard;
