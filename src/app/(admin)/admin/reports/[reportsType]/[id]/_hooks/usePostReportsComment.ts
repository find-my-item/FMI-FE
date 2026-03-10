import { usePostInquiryComments } from "@/api/fetch/InquiryComment";
import { ReportsType } from "../_types/ReportsType";
import { usePostReportComments } from "@/api/fetch/ReportComment";

interface UsePostReportsCommentParams {
  reportsId: number;
  reportsType: ReportsType;
}

export const usePostReportsComment = ({ reportsId, reportsType }: UsePostReportsCommentParams) => {
  const inquiryMutation = usePostInquiryComments(reportsId);
  const reportMutation = usePostReportComments(reportsId);

  const mutateAsync =
    reportsType === "inquiry" ? inquiryMutation.mutateAsync : reportMutation.mutateAsync;

  const isPending =
    reportsType === "inquiry" ? inquiryMutation.isPending : reportMutation.isPending;

  return {
    mutateAsync,
    isPending,
  };
};
