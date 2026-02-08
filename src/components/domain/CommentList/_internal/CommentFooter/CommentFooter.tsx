import { Icon } from "@/components/common";
import { cn } from "@/utils";

interface CommentFooterProps {
  footerData: {
    likeCount: number;
    id: number;
  };
  isThreadItem: boolean;
  isReplyFormOpen: boolean;
  setIsReplyFormOpen: (value: boolean) => void;
}

const CommentFooter = ({
  footerData,
  isThreadItem,
  isReplyFormOpen,
  setIsReplyFormOpen,
}: CommentFooterProps) => {
  const { likeCount, id } = footerData;

  const handleLikeClick = () => {
    console.log(id);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder"
        onClick={handleLikeClick}
      >
        <Icon name="CommentLikeIcon" size={16} /> <span>추천 {likeCount}</span>
      </button>

      {isThreadItem && (
        <button
          className={cn(
            "text-body1-regular",
            isReplyFormOpen ? "text-brand-normal-enteredSelected" : "text-neutral-strong-default"
          )}
          onClick={() => setIsReplyFormOpen(!isReplyFormOpen)}
        >
          답글 작성
        </button>
      )}
    </div>
  );
};

export default CommentFooter;
