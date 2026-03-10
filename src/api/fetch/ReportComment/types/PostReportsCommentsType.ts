import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryCommentsItem } from "../../InquiryComment";

// TODO(지권): 관리자 신고 상세 댓글 백엔드 추가 후 작업 필요

export interface PostReportCommentsResponse extends ApiBaseResponseType<PostReportCommentsResult> {}

export interface PostReportCommentsResult {
  result: InquiryCommentsItem;
}
