import { PageableInfo, SortInfo } from "@/api/_base/types/ApiBasePageableInfoType";
import { ReportsType } from "@/types";
import { InquiryCategory, InquiryType } from "@/types/InquiryType";

export interface AdminGuestInquiryItem {
  inquiryId: number;
  title: string;
  inquiryType: InquiryType;
  reason: string;
  category: InquiryCategory;
  status: ReportsType;
  createdAt: string;

  userEmail: string;

  ip: string;
}

export interface AdminGuestInquiryPageResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: AdminGuestInquiryItem[];

  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: PageableInfo;

  first: boolean;
  last: boolean;
  empty: boolean;
}
