import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportStatus } from "@/types";

interface UpdateReportStatusRequest {
  status: ReportStatus;
}
const STATUS_TOAST_MESSAGE: Record<ReportStatus, string> = {
  PENDING: "접수 상태로 변경되었어요",
  REVIEWED: "처리 중 상태로 변경되었어요",
  RESOLVED: "처리 완료 상태로 변경되었어요",
};

export const usePutReportStatus = (reportId: number) => {
  const { addToast } = useToast();
  const queryclient = useQueryClient();

  return useAppMutation<UpdateReportStatusRequest, ApiBaseResponseType<string>>(
    "auth",
    `/admin/reports/${reportId}/status`,
    "put",
    {
      onSuccess: (_, variables) => {
        queryclient.invalidateQueries({
          queryKey: ["detail-report", reportId],
        });
        queryclient.invalidateQueries({
          queryKey: ["reports"],
        });
        addToast(STATUS_TOAST_MESSAGE[variables.status], "success");
      },
      onError: () => {
        addToast("게시글 상태 변경에 실패했어요", "error");
      },
    }
  );
};
