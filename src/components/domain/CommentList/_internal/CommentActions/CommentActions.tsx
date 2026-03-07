import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@/components/common";
import { cn } from "@/utils";

interface CommentActionsProps {
  isThreadItem: boolean;
  viewReply: boolean;
  setViewReply: Dispatch<SetStateAction<boolean>>;
  isReplyFormOpen: boolean;
  setIsReplyFormOpen: Dispatch<SetStateAction<boolean>>;
  replyCount: number;
}

const CommentActions = ({
  isThreadItem,
  viewReply,
  setViewReply,
  isReplyFormOpen,
  setIsReplyFormOpen,
  replyCount,
}: CommentActionsProps) => {
  return (
    !isThreadItem && (
      <div className="flex items-center gap-3 py-2">
        <button
          className={cn("flex items-center gap-1", replyCount === 0 && "cursor-not-allowed")}
          onClick={() => setViewReply((prev) => !prev)}
          disabled={replyCount === 0}
        >
          <span
            className={cn(
              "text-body1-medium",
              viewReply ? "text-brand-normal-enteredSelected" : "text-layout-header-default"
            )}
          >
            답글 <span>{replyCount}</span>개
          </span>
          <Icon
            name="ArrowDownSmall"
            size={24}
            className={cn(
              "transition-all",
              viewReply
                ? "rotate-180 text-brand-strongUseThis-default"
                : "text-layout-header-default"
            )}
          />
        </button>

        <button
          className={cn(
            "text-body1-medium",
            isReplyFormOpen ? "text-brand-normal-enteredSelected" : "text-neutral-strong-default"
          )}
          onClick={() => setIsReplyFormOpen((prev) => !prev)}
        >
          답글 작성
        </button>
      </div>
    )
  );
};

export default CommentActions;
