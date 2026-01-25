import { Icon } from "@/components/common";
import { CommentCardType } from "@/types";
import Image from "next/image";

/**
 * @author suhyeon
 *
 * 댓글 카드 컴포넌트입니다.
 *
 *
 * @param commentId - 댓글 카드 id
 * @param mentionUser - 댓글에서 언급한 유저 닉네임
 * @param comment - 댓글 내용
 * @param date - 댓글 작성 날짜
 * @param like - 댓글의 좋아요 개수
 * @param thumbnailUrl - 댓글의 이미지 url
 *
 * @example
 * ```tsx
 * <CommentCard
 *   data={
 *     commentId: 1,
 *     mentionUser: "suhyeon",
 *     comment: "댓글 내용이 들어갑니다.",
 *     date: "2025-12-26T10:22:58",
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
  const { date, mentionUser, thumbnailUrl, comment, like } = data;

  return (
    <li className="flex w-full justify-between border-b border-divider-default px-5 py-[30px]">
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="w-full truncate">
          {mentionUser && <span className="mr-1 text-brand-normal-default"> @{mentionUser}</span>}
          {comment}
        </p>

        <span className="mt-1 text-body2-regular text-layout-body-default">{date}</span>

        <span className="mt-2 flex gap-1 text-body2-regular text-neutral-strong-placeholder">
          <Icon name="Heart" size={16} />
          {like}
        </span>
      </div>

      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt=""
          width={90}
          height={90}
          className="ml-1 h-[90px] w-[90px] object-cover"
        />
      )}
    </li>
  );
};

export default CommentCard;
