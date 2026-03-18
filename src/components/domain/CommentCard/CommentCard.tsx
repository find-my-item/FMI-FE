import { CommentItem } from "@/api/fetch/user";
import { Icon, ListItemImage } from "@/components/common";
import { formatDate } from "@/utils";
import Link from "next/link";

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
  data: CommentItem;
}

const CommentCard = ({ data }: CommentCardProps) => {
  const {
    commentId,
    postId,
    postTitle,
    content,
    likeCount,
    imageList = [],
    createdAt,
    like,
  } = data;
  const firstImage = imageList[0];
  const imageUrl = firstImage?.imageUrl;

  return (
    <li>
      <Link
        href={`/list/${postId}`}
        className="flex w-full justify-between border-b border-divider-default px-5 py-[30px]"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="w-full truncate">{content}</p>

          <span className="mt-1 text-body2-regular text-layout-body-default">
            {formatDate(createdAt)}
          </span>

          <span className="mt-2 flex gap-1 text-body2-regular text-neutral-strong-placeholder">
            <Icon name="Heart" size={16} />
            {likeCount}
          </span>
        </div>

        {imageList && <ListItemImage src={imageUrl} alt="댓글 이미지" size={90} />}
      </Link>
    </li>
  );
};

export default CommentCard;
