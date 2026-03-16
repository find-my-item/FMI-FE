import { ButtonHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils";

/**
 * @author hyungjun
 *
 * 댓글 목록에서 "더보기" 버튼으로 사용되는 컴포넌트입니다
 *
 * @param count - 총 댓글 수 입니다
 * @param isThreadItem - 답글 여부
 *
 * @example
 * <ViewMoreComment
 *   count={5}
 *   onClick={() => {}}
 * />
 */

interface ViewMoreCommentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
  isThreadItem?: boolean;
}

const ViewMoreComment = ({ count, isThreadItem = false, ...props }: ViewMoreCommentProps) => {
  if (count <= 0) return null;

  return (
    <div className={cn(!isThreadItem && "px-5 py-2 flex-center")}>
      <button
        type="button"
        aria-label="댓글 더 보기"
        className={cn(
          "flex items-center gap-1 px-5 py-2 text-brand-normal-default",
          isThreadItem &&
            "w-full rounded-[12px] border border-divider-default bg-white flex-center",
          isThreadItem ? "text-body1-regular" : "text-h3-medium"
        )}
        {...props}
      >
        <span>{isThreadItem ? "답글" : "댓글"}</span>
        <span>{count}개</span>
        <span>더 보기</span>
        <Icon name="ArrowDownSmall" size={24} className="text-brand-normal-default" />
      </button>
    </div>
  );
};

export default ViewMoreComment;
