import { ButtonHTMLAttributes } from "react";

/**
 * @author hyungjun
 *
 * 댓글 목록에서 "더보기" 버튼으로 사용되는 컴포넌트입니다.
 * 버튼을 클릭하면 추가 댓글을 불러오는 액션을 수행할 수 있습니다.
 *
 * @param text - 버튼에 표시할 텍스트입니다.
 *
 * @param ariaLabel - 접근성을 위한 버튼 라벨 텍스트입니다. (기본값: `"댓글 더보기"`)
 *
 * @example
 * ```tsx
 * <ViewMoreComment
 *   text="댓글 더보기"
 *   onClick={handleLoadMoreComments}
 * />
 * ```
 */

interface ViewMoreComment extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  ariaLabel?: string;
}

const ViewMoreComment = ({ text, ariaLabel = "댓글 더보기", ...props }: ViewMoreComment) => {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className="flex min-h-[41px] w-full text-h3-medium text-[#1EB87B] flex-center hover:text-[#00B76E] active:text-[#6ED5A7] disabled:text-[#98E3BD]"
    >
      <span>{text}</span>
    </button>
  );
};

export default ViewMoreComment;
