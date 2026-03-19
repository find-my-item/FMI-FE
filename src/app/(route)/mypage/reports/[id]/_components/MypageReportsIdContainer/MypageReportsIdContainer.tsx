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
            data={{ status: "admin", resolvedAt: resolvedAt, content: adminAnswer }}
          />
        </ul>
      )}
    </div>
  );
};

export default MypageReportsIdContainer;
