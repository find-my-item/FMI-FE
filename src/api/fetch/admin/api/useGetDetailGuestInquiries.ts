import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetDetailGuestInquiriesResponse } from "../types/DetailGuestInquiriesType";

export const useGetDetailGuestInquiries = ({ inquiryId }: { inquiryId: number }) => {
  return useAppQuery<GetDetailGuestInquiriesResponse>(
    "auth",
    ["guest-inquiries-detail", inquiryId],
    `/admin/guest-inquiries/${inquiryId}`
  );
};
