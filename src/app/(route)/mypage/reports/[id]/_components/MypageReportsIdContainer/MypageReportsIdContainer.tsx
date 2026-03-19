"use client";

import { useGetReportById } from "@/api/fetch/user";
import { Chip } from "@/components/common";
import { MypageCommentItem } from "@/components/domain";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { formatDate } from "@/utils";
import { useEffect } from "react";

interface MypageReportsIdContainerProps {
  id: number;
}

const mockMypageComment = {
  status: "admin" as "admin" | "user",
  content:
    "안녕하세요, 문의하신 내용에 대해 검토가 완료되었습니다. 해당 게시글은 운영 정책에 따라 조치되었음을 알려드립니다.",
  nickname: "운영자",
  createdAt: "2026-03-20T10:00:00.000Z",
  profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  answerImageList: [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
  ],
  resolvedAt: "2026-03-20T14:30:00.000Z",
};

const MypageReportsIdContainer = ({ id }: MypageReportsIdContainerProps) => {
  const { data: reportIdData, isError, isLoading } = useGetReportById({ reportId: id });
  const { addToast } = useToast();

  useEffect(() => {
    if (isError) addToast("신고내역을 불러오는데 실패했어요", "error");
  }, [isError, addToast]);

  if (isLoading) return <LoadingState />;

  const result = reportIdData?.result;
  if (!result) return null;
  const {
    nickname,
    reportId,
    targetId,
    targetType,
    targetTitle,
    status,
    reason,
    answered,
    adminAnswer,
    createdAt,
    resolvedAt,
  } = result;

  return (
    <div className="w-full h-base">
      <div className="border-b-flat-gray-50 w-full border-b px-5 py-[30px]">
        <Chip label="접수" type="brandSubtle" />
        <h2 className="mt-[14px] text-h2-medium">{targetTitle}</h2>
        <time dateTime={createdAt} className="mt-1 text-body2-regular text-layout-body-default">
          {formatDate(createdAt)}
        </time>
        <p className="mt-6 text-body1-regular text-layout-header-default">{reason}</p>
      </div>

      {answered && (
        <ul>
          <MypageCommentItem
            data={mockMypageComment}
            // data={{ status: "admin", resolvedAt: resolvedAt, content: adminAnswer }}
          />
        </ul>
      )}
    </div>
  );
};

export default MypageReportsIdContainer;
