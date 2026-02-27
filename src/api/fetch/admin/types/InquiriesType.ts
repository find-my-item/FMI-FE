import { PageableInfo, SortInfo } from "@/api/_base/types/ApiBasePageableInfoType";
import { ReportsType } from "@/types";
import { InquiryCategory, InquiryType } from "@/types/InquiryType";

export interface AdminInquiryItem {
  inquiryId: number;
  title: string;
  inquiryType: InquiryType;
  category: InquiryCategory;
  status: ReportsType;
  createdAt: string;

  userId: number;
  userNickname: string;
  userEmail: string;

  ip: string;
}

export interface AdminInquiryPageResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: AdminInquiryItem[];

  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: PageableInfo;

  first: boolean;
  last: boolean;
  empty: boolean;
}
