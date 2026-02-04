import { ReportStatus, ReportTargetType, ReportType } from "@/types";

export interface AdminReportItem {
  reportId: number;
  targetType: ReportTargetType;
  targetId: number;
  reportType: ReportType;
  status: ReportStatus;
  reason: string;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  reporterId: number;
  reporterNickname: string;
  reporterEmail: string;
}

export interface SortInfo {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PageableSortInfo extends SortInfo {}

export interface PageableInfo {
  offset: number;
  sort: PageableSortInfo;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
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
