import { useState } from "react";
import { Icon } from "@/components/common";
import { ReportTargetType } from "@/types";
import ReportModal from "../ReportModal/ReportModal";
import UserBlockModal from "./_internal/UserBlockModal/UserBlockModal";

/**
 * @author jikwon
 *
 * @description
 * 게시글 상세페이지, 댓글 등에서 사용하는 신고하기, 차단하기 버튼을 렌더링하는 컴포넌트입니다.
 *
 * @param postId - 게시글 ID
 * @param userId - 작성자 ID
 * @param targetType - 신고 대상의 타입 ("CHAT" | "POST" | "COMMENT" | "USER")
 * @param onClose - 액션 모달을 닫는 함수
 *
 * @example
 * <PostReportBlockActions postId={1} targetType="POST" userId={1} onClose={() => setIsActionMenuOpen(false)} />
 */
interface PostReportBlockActionsProps {
  postId: number;
  targetType: ReportTargetType;
  userId: number;
  onClose: () => void;
}

const PostReportBlockActions = ({
  postId,
  targetType,
  userId,
  onClose,
}: PostReportBlockActionsProps) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const openModal = (setter: (v: boolean) => void) => {
    setter(true);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className="gap-2 px-7 py-4 flex-center"
        onClick={() => openModal(setIsReportOpen)}
      >
        <Icon name="UserReport" size={18} />
        <span className="text-system-warning">게시글 신고하기</span>
      </button>

      <hr className="w-full border border-white" />

      <button
        type="button"
        className="gap-2 px-7 py-4 flex-center"
        onClick={() => openModal(setIsBlockOpen)}
      >
        {/* TODO(지권): 아이콘 변경 필요 */}
        <Icon name="UserBlock" size={20} />
        <span className="text-system-warning">작성자 차단하기</span>
      </button>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType={targetType}
        targetId={postId}
      />

      <UserBlockModal isOpen={isBlockOpen} onClose={() => setIsBlockOpen(false)} userId={userId} />
    </>
  );
};

export default PostReportBlockActions;
