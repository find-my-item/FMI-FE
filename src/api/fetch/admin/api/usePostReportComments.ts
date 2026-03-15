import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";

interface UpdateReportCommentRequest {
  adminAnswer: string;
  images: string[];
}

export const usePostReportComments = (reportId: number) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<UpdateReportCommentRequest>(
    "auth",
    `/admin/reports/${reportId}/answer`,
    "put",
    {
      onSuccess: () => {
        addToast("답변이 등록되었어요", "success");
        queryClient.invalidateQueries({
          queryKey: ["detail-report", reportId],
        });
      },
    }
  );
};
