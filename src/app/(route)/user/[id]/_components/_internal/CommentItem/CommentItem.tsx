import { Icon } from "@/components";

interface CommentItemProps {
  comment: string;
  date: string;
}

const CommentItem = ({ comment, date }: CommentItemProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-2 border-b border-divider-default px-5 py-[30px]">
      <p className="line-clamp-1 w-full text-body1-semibold text-layout-header-default">
        {comment}
      </p>
      <span className="text-body2-regular text-layout-body-default">{date}</span>
      <div className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder">
        <Icon name="Star" size={16} />
        <span>12</span>
      </div>
    </div>
  );
};

export default CommentItem;
