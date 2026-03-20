"use client";

import { useGetReportById } from "@/api/fetch/report";
import { Chip } from "@/components/common";
import { MypageCommentItem } from "@/components/domain";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { formatDate } from "@/utils";
import { useEffect } from "react";
import { REPORT_STATUS_CHIP } from "../../../_constants/REPORT_STATUS_CHIP";

interface MypageReportsIdContainerProps {
  id: number;
}

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
        <Chip label={REPORT_STATUS_CHIP[status].label} type={REPORT_STATUS_CHIP[status].chipType} />
        <h2 className="mt-[14px] text-h2-medium">{targetTitle}</h2>
        <time dateTime={createdAt} className="mt-1 text-body2-regular text-layout-body-default">
          {formatDate(createdAt)}
        </time>
        <p className="mt-6 text-body1-regular text-layout-header-default">{reason}</p>
      </div>

      {answered && (
        <ul>
          <MypageCommentItem
            // TODO(수현): 백엔드 수정 중이라 닉네임은 임시 데이터로 넘겨주고 있습니다.
            data={{
              resolvedAt: resolvedAt,
              content: adminAnswer,
              nickname: "찾아줘! 관리자",
              role: "admin",
            }}
          />
        </ul>
      )}
    </div>
  );
};

export default MypageReportsIdContainer;
