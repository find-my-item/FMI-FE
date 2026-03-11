import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetDetailReportResponse } from "../types/DetailReportType";

interface UseGetDetailReportOptions {
  enabled?: boolean;
}

interface UseGetDetailReportProps {
  reportId: number;
}

export const useGetDetailReport = (
  { reportId }: UseGetDetailReportProps,
  { enabled = true }: UseGetDetailReportOptions = {}
) => {
  return useAppQuery<GetDetailReportResponse>(
    "auth",
    ["detail-report", reportId],
    `/admin/reports/${reportId}`,
    {
      enabled,
    }
  );
};
