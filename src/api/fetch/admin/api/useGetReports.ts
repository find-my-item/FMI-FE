import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { AdminReportItem, GetReportsResponse, ReportsServiceType } from "../types/ReportsType";

interface UseGetReportsParams {
  type?: ReportsServiceType;
  cursor?: string;
  size?: number;
}

export const useGetReports = ({ type = "REPORT", cursor, size = 1 }: UseGetReportsParams = {}) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (type) params.set("type", type);
  if (cursor) params.set("cursor", cursor);

  return useAppInfiniteQuery<GetReportsResponse, unknown, AdminReportItem[]>(
    "auth",
    ["reports", type, cursor, size],
    `/admin/customer-service?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<GetReportsResponse>) =>
        data.pages.flatMap((page) => page.result.items ?? []),
    }
  );
};
