import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetGuestInquiriesResponse } from "../types/GuestInquiriesType";

export const useGetDetailGuestInquiries = ({ inquiryId }: { inquiryId: number }) => {
  return useAppQuery<GetGuestInquiriesResponse>(
    "auth",
    ["guest-inquiries-detail", inquiryId],
    `/admin/guest-inquiries/${inquiryId}`
  );
};
