import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@/components/common";
import { cn } from "@/utils";

interface CommentActions {
  isThreadItem: boolean;
  viewReply: boolean;
  setViewReply: Dispatch<SetStateAction<boolean>>;
  isReplyFormOpen: boolean;
  setIsReplyFormOpen: Dispatch<SetStateAction<boolean>>;
}

const CommentActions = ({
  isThreadItem,
  viewReply,
  setViewReply,
  isReplyFormOpen,
  setIsReplyFormOpen,
}: CommentActions) => {
  return (
    <div className="flex items-center gap-3 py-2">
      {!isThreadItem && (
        <button className="flex items-center gap-1" onClick={() => setViewReply((prev) => !prev)}>
          <span
            className={cn(
              "text-body1-medium",
              isThreadItem ? "text-brand-normal-enteredSelected" : "text-layout-header-default"
            )}
          >
            답글 <span>0</span>개
          </span>
          <Icon
            name="ArrowDownSmall"
            size={24}
            className={cn("transition-all", viewReply && "rotate-180")}
          />
        </button>
      )}
      {!isThreadItem && (
        <button
          className={cn(
            "text-body1-medium text-neutral-strong-default",
            isReplyFormOpen && "text-[#0AA874]"
          )}
          onClick={() => setIsReplyFormOpen((prev) => !prev)}
        >
          답글 작성
        </button>
      )}
    </div>
  );
};

export default CommentActions;
