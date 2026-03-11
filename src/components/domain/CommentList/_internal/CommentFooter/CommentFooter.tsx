import { Icon } from "@/components/common";
import { cn } from "@/utils";

interface CommentFooterProps {
  footerData: {
    likeCount: number;
    id: number;
    isLike: boolean;
  };
  isReply: boolean;
  isGuest: boolean;
  isReplyFormOpen: boolean;
  setIsReplyFormOpen: (value: boolean) => void;
  queryKey: unknown[];
  deleted: boolean;
  onFavoriteComment: (commentId: number, isLike: boolean, queryKey: unknown[]) => void;
}

const CommentFooter = ({
  footerData,
  isReply,
  isGuest,
  isReplyFormOpen,
  setIsReplyFormOpen,
  queryKey,
  deleted,
  onFavoriteComment,
}: CommentFooterProps) => {
  const { likeCount, id, isLike } = footerData;

  const handleLikeClick = () => {
    onFavoriteComment(id, isLike, queryKey);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        aria-label={isLike ? "좋아요 취소" : "좋아요"}
        className={cn(
          "flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
        onClick={isGuest || deleted ? undefined : handleLikeClick}
        disabled={isGuest || deleted}
      >
        <Icon
          name="Heart"
          size={16}
          className={cn(isLike ? "text-system-favorite" : "text-border-divider-default")}
        />
        <span>좋아요 {likeCount}</span>
      </button>

      {isReply && (
        <button
          className={cn(
            "text-body1-regular",
            isReplyFormOpen ? "text-brand-normal-enteredSelected" : "text-neutral-strong-default"
          )}
          onClick={isGuest ? undefined : () => setIsReplyFormOpen(!isReplyFormOpen)}
        >
          답글 작성
        </button>
      )}
    </div>
  );
};

export default CommentFooter;
