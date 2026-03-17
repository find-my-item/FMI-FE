import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostInquiryRequest } from "../types/PostInquiryRequestType";

export const usePostInquiry = () => {
  return useAppMutation<PostInquiryRequest>("auth", "/inquiries", "post");
};
