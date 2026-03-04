"use client";

import { useEffect } from "react";
import { useGetReports } from "@/api/fetch/admin/api/useGetReports";
import { useInfiniteScroll } from "@/hooks";
import { EmptyState, LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
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

  return (
    <section aria-label="신고/문의 목록">
      {data?.length === 0 ? (
        <EmptyState
          icon={{ iconName: "NoInquiries", iconSize: 70 }}
          title="등록된 문의 내역이 없어요"
          description={"아직 문의 내역이 없습니다.\n문의가 접수되면 이곳에 표기됩니다."}
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {data?.map((item) => (
            <AdminReportsItem
              key={item.id}
              data={isReport ? toReportItemVM(item) : toInquiryItemVM(item)}
            />
          ))}
        </ul>
      )}
      {hasNextPage && <div ref={listRef} className="h-10 w-full" />}
    </section>
  );
};

export default ReportsList;
