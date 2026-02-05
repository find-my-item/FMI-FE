import { PageableInfo, SortInfo } from "@/api/_base/types/ApiBasePagebleInfoType";
import { ReportsType, ReportTargetType, ReportType } from "@/types";

export interface AdminReportItem {
  reportId: number;
  targetType: ReportTargetType;
  targetId: number;
  reportType: ReportType;
  status: ReportsType;
  reason: string;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  reporterId: number;
  reporterNickname: string;
  reporterEmail: string;
}

export interface AdminReportPageResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: AdminReportItem[];

  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: PageableInfo;

  first: boolean;
  last: boolean;
  empty: boolean;
}
