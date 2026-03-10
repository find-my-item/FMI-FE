import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { PostReportCommentsResponse } from "../types/PostReportsCommentsType";

// TODO(지권): 관리자 신고 상세 댓글 백엔드 추가 후 작업 필요

interface UpdateInquiryStatusRequest {
  content: string;
}

export const usePostReportComments = (reportId: number) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<UpdateInquiryStatusRequest, PostReportCommentsResponse>(
    "auth",
    `/reports/${reportId}/comments`,
    "post",
    {
      onSuccess: () => {
        addToast("댓글이 등록되었습니다.", "success");
        queryClient.invalidateQueries({
          queryKey: ["detail-report", reportId],
        });
      },
    }
  );
};
