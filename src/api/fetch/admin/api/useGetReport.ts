import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { AdminReportItem, GetReportResponse } from "../types/ReportType";
import { ReportStatus } from "@/types";

interface UseGetReportOptions {
  enabled?: boolean;
}

interface UseGetReportParams {
  status?: ReportStatus;
  answered?: boolean;
  keyword?: string;
  size?: number;
}

export const useGetReport = (
  { status, answered, keyword, size = 10 }: UseGetReportParams,
  { enabled = true }: UseGetReportOptions = {}
) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (status) params.set("status", status);
  if (answered !== undefined) params.set("answered", String(answered));
  if (keyword) params.set("keyword", keyword);

  return useAppInfiniteQuery<GetReportResponse, unknown, AdminReportItem[]>(
    "auth",
    ["reports", status, answered, keyword, size],
    `/admin/reports?${params.toString()}`,
    {
      enabled,
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<GetReportResponse>) =>
        data.pages.flatMap((page) => page.result.content ?? []),
    }
  );
};
