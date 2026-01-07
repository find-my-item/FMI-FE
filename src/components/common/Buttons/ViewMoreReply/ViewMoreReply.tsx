import Icon from "../../Icon/Icon";

/**
 * @author hyungjun
 *
 * 댓글 아래에서 "답글 더보기"와 "답글 쓰기" 버튼으로 사용되는 컴포넌트입니다.
 * 두 개의 독립적인 버튼으로 구성되어 있습니다.
 * - 첫 번째 버튼: 답글 더보기 (추가 답글을 불러오는 액션)
 * - 두 번째 버튼: 답글 쓰기 (답글 작성 액션)
 *
 * @param text - 더보기 버튼에 표시할 텍스트입니다. 예: "답글 5개"
 * @param onViewMore - 답글 더보기 버튼 클릭 핸들러입니다.
 * @param onWriteReply - 답글 쓰기 버튼 클릭 핸들러입니다.
 * @param viewMoreAriaLabel - 더보기 버튼의 접근성 라벨입니다. (기본값: "답글 더보기")
 * @param writeReplyAriaLabel - 답글 쓰기 버튼의 접근성 라벨입니다. (기본값: "답글 쓰기")
 *
 * @example
 * ```tsx
 * <ViewMoreReply
 *   text="답글 5개"
 *   onViewMore={handleViewMore}
 *   onWriteReply={handleWriteReply}
 * />
 * ```
 */

interface ViewMoreReplyProps {
  text: string;
  onViewMore?: () => void;
  onWriteReply?: () => void;
  viewMoreAriaLabel?: string;
  writeReplyAriaLabel?: string;
  disabled?: boolean;
}

// TODO(형준): svgr 수정 시, 아이콘 색 수정
const ViewMoreReply = ({
  text,
  onViewMore,
  onWriteReply,
  viewMoreAriaLabel = "답글 더보기",
  writeReplyAriaLabel = "답글 쓰기",
  disabled = false,
}: ViewMoreReplyProps) => {
  return (
    <div className="flex min-h-[40px] w-[390px] items-center gap-[12px]">
      <button
        onClick={onViewMore}
        className="flex items-center gap-[4px]"
        aria-label={viewMoreAriaLabel}
        disabled={disabled}
      >
        <span className="text-body1-medium text-brand-normal-default hover:text-brand-normal-hover active:text-brand-normal-pressed disabled:text-brand-normal-disabled">
          {text}
        </span>
        <Icon name="ArrowDown" size={20} />
      </button>
      <button
        onClick={onWriteReply}
        className="text-body1-medium text-neutral-strong-default hover:text-black active:text-neutral-strong-preesed disabled:text-neutral-strong-disabled"
        aria-label={writeReplyAriaLabel}
        disabled={disabled}
      >
        답글 쓰기
      </button>
    </div>
  );
};

export default ViewMoreReply;
