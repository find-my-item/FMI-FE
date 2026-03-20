import { InquiryStatus } from "@/types";

export type InquiryStatusFilterValue = InquiryStatus | undefined;

export interface InquiryStatusFilterState {
  inquiryStatus: InquiryStatusFilterValue;
}
