"use client";

import { useEffect } from "react";
import { useGetReports } from "@/api/fetch/admin/api/useGetReports";
import { useInfiniteScroll } from "@/hooks";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { MOCK_ADMIN_INQUIRY_LIST, MOCK_ADMIN_REPORT_LIST } from "@/mock/data";
import { toInquiryItemVM, toReportItemVM } from "../../../_utils/toReportsItemVM/toReportsItemVM";
import { ReportsTabType } from "../../_types/ReportsTabType";
import { AdminReportsItem } from "../../../_components";

interface ReportsListProps {
  activeTab: ReportsTabType;
}

const ReportsList = ({ activeTab }: ReportsListProps) => {
  const { addToast } = useToast();

  const isReport = activeTab === "report";
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetReports({
      type: isReport ? "REPORT" : "INQUIRY",
    });
  const { ref: listRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  useEffect(() => {
    if (isError) addToast("유저 탈퇴 사유를 불러오지 못했어요", "error");
  }, [isError, addToast]);

  if (isLoading) return <LoadingState />;
  if (isError) return null;
  console.log(data);

  return (
    <section aria-label="신고/문의 목록">
      <ul className="flex flex-col gap-2">
        {isReport
          ? MOCK_ADMIN_REPORT_LIST.map((item, index) => (
              <AdminReportsItem key={index} data={toReportItemVM(item)} />
            ))
          : MOCK_ADMIN_INQUIRY_LIST.map((item, index) => (
              <AdminReportsItem key={index} data={toInquiryItemVM(item)} />
            ))}
      </ul>
      {hasNextPage && <div ref={listRef} className="h-10 w-full" />}
    </section>
  );
};

export default ReportsList;
