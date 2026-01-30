import { Icon } from "@/components/common";
import { cn } from "@/utils";

interface CommentFooterProps {
  isThreadItem: boolean;
  isReplyFormOpen: boolean;
  setIsReplyFormOpen: (value: boolean) => void;
}

const CommentFooter = ({
  isThreadItem,
  isReplyFormOpen,
  setIsReplyFormOpen,
}: CommentFooterProps) => {
  return (
    <div className="flex items-center gap-3">
      {/* 댓글 좋아요 / (답글·대댓글) 답글 작성 */}
      <button className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder">
        <Icon name="CommentLikeIcon" size={16} /> <span>추천 12</span>
      </button>

      {isThreadItem && (
        <button
          className={cn(
            "text-body1-regular text-layout-header-default",
            isReplyFormOpen && "text-[#0AA874]"
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
