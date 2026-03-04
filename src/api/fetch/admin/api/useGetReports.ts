import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { AdminReportItem, GetReportsResponse, ReportsServiceType } from "../types/ReportsType";

interface UseGetReportsParams {
  type?: ReportsServiceType;
  size?: number;
}

export const useGetReports = ({ type = "REPORT", size = 10 }: UseGetReportsParams = {}) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (type) params.set("type", type);

  return useAppInfiniteQuery<GetReportsResponse, unknown, AdminReportItem[]>(
    "auth",
    ["reports", type, size],
    `/admin/customer-service?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<GetReportsResponse>) =>
        data.pages.flatMap((page) => page.result.items ?? []),
    }
  );
};
