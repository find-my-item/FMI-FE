import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export const useGetReportById = ({ reportId }: { reportId: number }) => {
  return useAppQuery<ApiBaseResponseType<null>>(
    "auth",
    ["/reports/id", reportId],
    `/reports/${reportId}`
  );
};
