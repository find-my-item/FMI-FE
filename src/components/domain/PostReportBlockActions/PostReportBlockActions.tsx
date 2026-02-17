import { useState } from "react";
import { Icon } from "@/components/common";
import { ReportTargetType } from "@/types";
import ReportModal from "../ReportModal/ReportModal";
import UserBlockModal from "./_internal/UserBlockModal/UserBlockModal";

interface PostReportBlockActionsProps {
  postId: number;
  targetType: ReportTargetType;
  userId: number;
}

const PostReportBlockActions = ({ postId, targetType, userId }: PostReportBlockActionsProps) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  return (
    <>
      <button className="gap-2 px-7 py-4 flex-center" onClick={() => setIsReportOpen(true)}>
        <Icon name="UserReport" size={18} />
        <span className="text-system-warning">게시글 신고하기</span>
      </button>
      <hr className="w-full border border-white" />
      <button className="gap-2 px-7 py-4 flex-center">
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
