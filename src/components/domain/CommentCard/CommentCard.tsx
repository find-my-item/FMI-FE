import { Icon } from "@/components/common";
import Image from "next/image";

export type CommentCardType = {
  commentId: number;
  mentionUser?: string;
  comment: string;
  date: string;
  like: number;
  thumbnailUrl?: string;
};

interface CommentCardProps {
  data: CommentCardType;
}

const CommentCard = ({ data }: CommentCardProps) => {
  return (
    <li className="flex w-full justify-between border-b border-divider-default px-5 py-[30px]">
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="w-full truncate">
          {data.mentionUser && (
            <span className="mr-1 text-brand-normal-default"> @{data.mentionUser}</span>
          )}
          {data.comment}
        </p>

        <span className="mt-1 text-body2-regular text-layout-body-default">{data.date}</span>

        <span className="mt-2 flex gap-1 text-body2-regular text-neutral-strong-placeholder">
          <Icon name="Heart" size={16} />
          {data.like}
        </span>
      </div>

      {data.thumbnailUrl && (
        <Image
          src={data.thumbnailUrl}
          alt=""
          width={90}
          height={90}
          className="ml-1 object-cover"
        />
      )}
    </li>
  );
};

export default CommentCard;
