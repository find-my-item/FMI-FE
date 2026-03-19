"use client";

import { ReportItemType, useGetUserReports } from "@/api/fetch/user";
import { Chip } from "@/components/common";
import { MypageEmptyUI } from "@/components/domain";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { useFilterParams } from "@/hooks/domain";
import { formatDate } from "@/utils";
import Link from "next/link";
import { useEffect } from "react";

export const REPORT_STATUS_CHIP = {
  PENDING: { label: "접수", chipType: "brandSubtle" },
  REVIEWED: { label: "처리 중", chipType: "brandSubtle" },
  RESOLVED: { label: "처리 완료", chipType: "neutralStrong" },
} as const;

interface MypageReportsItemProps {
  reports: ReportItemType;
}

const MypageReportsItem = ({ reports }: MypageReportsItemProps) => {
  const { reportId, targetId, targetTitle, targetType, reason, status, createdAt, resolvedAt } =
    reports;
  return (
    <li>
      <Link href={`/mypage/reports/${reportId}`}>
        <Chip label={REPORT_STATUS_CHIP[status].label} type={REPORT_STATUS_CHIP[status].chipType} />

        <h3 className="mt-2 text-h3-semibold text-layout-header-default">{targetTitle}</h3>

        <time
          dateTime={createdAt}
          className="mt-[3px] block text-body2-regular text-layout-body-default"
        >
          {formatDate(createdAt)}
        </time>

        <p className="mt-2 truncate text-body2-regular text-neutral-normal-default">{reason}</p>
      </Link>
    </li>
  );
};

const MypageReportsContent = () => {
  const { requestStatus } = useFilterParams();

  const {
    data: reportsData,
    isLoading,
    isError,
  } = useGetUserReports({
    status: requestStatus,
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (isError) {
      addToast("목록을 불러오는데 실패했어요", "error");
    }
  }, [isError, addToast]);

  if (isLoading) return <LoadingState />;

  return (
    <section>
      <h2 className="sr-only">내 신고 내역 목록 영역</h2>

      {reportsData && reportsData.length === 0 ? (
        <MypageEmptyUI pageType="reports" />
      ) : (
        <ul>
          {reportsData &&
            reportsData.map((item) => <MypageReportsItem key={item.reportId} reports={item} />)}
        </ul>
      )}
    </section>
  );
};

export default MypageReportsContent;
