import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryCommentsItem } from "./GetInquiryCommentsType";

export interface PostInquiryCommentsResponse extends ApiBaseResponseType<PostInquiryCommentsResult> {}

export interface PostInquiryCommentsResult {
  result: InquiryCommentsItem;
}
