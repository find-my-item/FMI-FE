import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportStatus } from "@/types";

interface UpdateReportStatusRequest {
  status: ReportStatus;
}

export const usePutReportStatus = (reportId: number) => {
  const { addToast } = useToast();
  const queryclient = useQueryClient();

  return useAppMutation<UpdateReportStatusRequest, ApiBaseResponseType<string>>(
    "auth",
    `/admin/reports/${reportId}/status`,
    "put",
    {
      onSuccess: () => {
        queryclient.invalidateQueries({
          queryKey: ["detail-report", reportId],
        });
        queryclient.invalidateQueries({
          queryKey: ["reports"],
        });
        addToast("상태가 변경되었습니다.", "success");
      },
    }
  );
};
