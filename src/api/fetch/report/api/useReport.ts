import useAppMutation from "@/api/_base/query/useAppMutation";
import { ReportReason } from "@/components/domain/Report/_internal";
import { useToast } from "@/context/ToastContext";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { ReportRequest } from "../types/ReportRequest";

interface UseReportParams {
  reset: () => void;
  setReportType: (reportType: ReportReason | null) => void;
  invalidateKey?: QueryKey;
  onClose: () => void;
}

const useReport = ({ reset, setReportType, invalidateKey, onClose }: UseReportParams) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<ReportRequest>("auth", "/reports", "post", {
    onSuccess: () => {
      reset();
      setReportType(null);
      toast.addToast("신고가 접수되었어요", "success");
      invalidateKey && queryClient.invalidateQueries({ queryKey: invalidateKey });
      onClose();
    },
    onError: () => {
      toast.addToast("신고에 실패했습니다.", "error");
    },
  });
};

export default useReport;
