import Link from "next/link";
import { Icon } from "@/components/common";

interface CommentItemProps {
  data: {
    postId: number;
    comment: string;
    date: string;
    likes: number;
  };
}

const CommentItem = ({ data }: CommentItemProps) => {
  const { postId, comment, date, likes } = data;

  return (
    <li className="border-b border-divider-default px-5 py-[30px] transition-colors hover:bg-flatGray-25">
      <Link href={`/list/${postId}`} className="flex w-full flex-col items-start gap-2">
        <p className="line-clamp-1 w-full text-body1-semibold text-layout-header-default">
          {comment}
        </p>
        <time className="text-body2-regular text-layout-body-default" dateTime={date}>
          {date}
        </time>
        <div
          aria-label={`좋아요 ${likes}개`}
          className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder"
        >
          <Icon name="Heart" size={16} />
          <span>좋아요 {likes}</span>
        </div>
      </Link>
    </li>
  );
};

export default CommentItem;
