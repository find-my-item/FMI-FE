import { ReactNode } from "react";
import { Icon } from "@/components/common";

/**
 * @author jikwon
 *
 * @description
 * 게시글 상세페이지, 댓글 등에서 사용하는 신고하기, 차단하기 버튼을 렌더링하는 컴포넌트입니다.
 *
 * @param onOpenReport - 신고 모달을 여는 함수
 * @param onOpenBlock - 차단 모달을 여는 함수
 *
 * @example
 * <PostReportBlockActions onOpenReport={() => setIsReportOpen(true)} onOpenBlock={() => setIsBlockOpen(true)} />
 */
interface PostReportBlockActionsProps {
  onOpenReport: () => void;
  onOpenBlock: () => void;
}

const PostReportBlockActions = ({ onOpenReport, onOpenBlock }: PostReportBlockActionsProps) => {
  return (
    <>
      <ActionButton
        icon={<Icon name="UserReport" size={18} />}
        label="게시글 신고하기"
        onClick={onOpenReport}
      />

      <hr className="w-full border border-white" />

      <ActionButton
        // TODO(지권): 차단 아이콘 변경 필요
        icon={<Icon name="UserBlock" size={20} />}
        label="작성자 차단하기"
        onClick={onOpenBlock}
      />
    </>
  );
};

export default PostReportBlockActions;

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => {
  return (
    <button type="button" className="gap-2 px-7 py-4 flex-center" onClick={onClick}>
      {icon}
      <span className="text-system-warning">{label}</span>
    </button>
  );
};
