import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { MypageInquiriesResponseType } from "../types/GetInquiryByIdResponseType";

export const useGetInquiriesById = ({ inquiryId }: { inquiryId: number }) => {
  return useAppQuery<MypageInquiriesResponseType, ApiBaseResponseType<null>>(
    "auth",
    ["/inquiries/id", inquiryId],
    `/inquiries/${inquiryId}`
  );
};
