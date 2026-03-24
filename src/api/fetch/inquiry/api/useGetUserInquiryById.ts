import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetByIdInquiryResponseType } from "../types/GetByIdInquiryResponseType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export const useGetUserInquiryById = ({ inquiryId }: { inquiryId: number }) => {
  return useAppQuery<GetByIdInquiryResponseType, ApiBaseResponseType<null>>(
    "auth",
    ["/inquiries/id", inquiryId],
    `/inquiries/${inquiryId}`
  );
};
