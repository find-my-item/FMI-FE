import Icon from "@/components/Icon/Icon";
import { ButtonHTMLAttributes } from "react";

/**
 * @author hyungjun
 *
 * 댓글 아래에서 "답글 더보기" 버튼으로 사용되는 컴포넌트입니다.
 * 버튼을 클릭하면 추가 답글을 불러오거나, 답글 작성 액션을 수행할 수 있습니다.
 * 아이콘과 텍스트가 그룹으로 구성되어 있으며, 상태에 따라 색상이 변경됩니다.
 *
 * @param text - 버튼에 표시할 텍스트입니다. 예: "답글 더보기"
 *
 * @param ariaLabel - 접근성을 위한 버튼 라벨 텍스트입니다. (기본값: `"답글 더보기"`)
 *
 * @example
 * ```tsx
 * <ViewMoreReply
 *   text="답글 더보기"
 *   onClick={handleLoadMoreReplies}
 * />
 * ```
 */

interface ViewMoreReply extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  ariaLabel?: string;
}

// TODO(형준): svgr 수정 시, 아이콘 색 수정
const ViewMoreReply = ({ text, ariaLabel = "답글 더보기", ...props }: ViewMoreReply) => {
  return (
    <button
      {...props}
      className="group flex min-h-[40px] w-[390px] items-center gap-[12px] px-[20px]"
      aria-label={ariaLabel}
    >
      <div className="flex gap-[4px] font-[150] text-[#1EB87B] group-active:text-[#6ED5A7] group-disabled:text-[#98E3BD]">
        <span>{text}</span>
        <Icon name="ArrowDown" />
      </div>
      <span className="text-[#5D5D5D] group-hover:text-black group-active:text-[#9D9D9D] group-disabled:text-[#9D9D9D]">
        답글 쓰기
      </span>
    </button>
  );
};

export default ViewMoreReply;
