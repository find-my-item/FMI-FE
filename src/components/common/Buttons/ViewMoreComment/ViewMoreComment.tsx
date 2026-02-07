import { ButtonHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";

/**
 * @author hyungjun
 *
 * 댓글 목록에서 "더보기" 버튼으로 사용되는 컴포넌트입니다
 *
 * @param count - 총 댓글 수 입니다
 *
 * @example
 * <ViewMoreComment
 *   count={5}
 *   onClick={() => {}}
 * />
 */

interface ViewMoreCommentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

const ViewMoreComment = ({ count, ...props }: ViewMoreCommentProps) => {
  if (count <= 0) return null;

  return (
    <div className="pb-[14px] pt-6 flex-center">
      <button
        type="button"
        aria-label="댓글 더 보기"
        className="flex items-center gap-1 px-5 py-2 text-h3-medium text-layout-header-default"
        {...props}
      >
        <span>댓글</span>
        <span>{count}개</span>
        <span>더 보기</span>
        <Icon name="ArrowDownSmall" size={24} />
      </button>
    </div>
  );
};

export default ViewMoreComment;
