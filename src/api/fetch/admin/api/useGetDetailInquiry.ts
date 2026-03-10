import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetDetailInquiryResponse } from "../types/DetailInquiryType";

interface UseGetDetailInquiryOptions {
  enabled?: boolean;
}

interface UseGetDetailInquiryProps {
  inquiryId: number;
}

export const useGetDetailInquiry = (
  { inquiryId }: UseGetDetailInquiryProps,
  { enabled = true }: UseGetDetailInquiryOptions = {}
) => {
  return useAppQuery<GetDetailInquiryResponse>(
    "auth",
    ["detail-inquiry", inquiryId],
    `/admin/inquiries/${inquiryId}`
  );
};
