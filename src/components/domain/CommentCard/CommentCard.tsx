import { Icon } from "@/components/common";
import { CommentCardType } from "@/types";
import Image from "next/image";

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
