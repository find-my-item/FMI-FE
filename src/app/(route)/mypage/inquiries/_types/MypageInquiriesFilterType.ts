import { InquiryType } from "@/types";

export type InquiryStatusFilterValue = InquiryType | undefined;

export interface InquiryStatusFilterState {
  inquiryStatus: InquiryStatusFilterValue;
}
