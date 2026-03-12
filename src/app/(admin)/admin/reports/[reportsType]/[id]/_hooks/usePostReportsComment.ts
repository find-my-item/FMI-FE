import { usePostInquiryComments } from "@/api/fetch/InquiryComment";
import { usePostReportComments } from "@/api/fetch/admin";
import { ReportsType } from "../_types/ReportsType";

interface UsePostReportsCommentParams {
  reportsId: number;
  reportsType: ReportsType;
}

export const usePostReportsComment = ({ reportsId, reportsType }: UsePostReportsCommentParams) => {
  const inquiryMutation = usePostInquiryComments(reportsId);
  const reportMutation = usePostReportComments(reportsId);

  const mutateAsync = async (data: { content: string }) => {
    if (reportsType === "inquiry") {
      return inquiryMutation.mutateAsync(data);
    }
    return reportMutation.mutateAsync({ adminAnswer: data.content });
  };

  const isPending =
    reportsType === "inquiry" ? inquiryMutation.isPending : reportMutation.isPending;

  return {
    mutateAsync,
    isPending,
  };
};
