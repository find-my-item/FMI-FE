import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportsType } from "@/types";

export interface GetReportsResponse extends ApiBaseResponseType<ReportResult> {}

export interface ReportResult {
  items: AdminReportItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface AdminReportItem {
  type: ReportsServiceType;
  id: number;
  title: string;
  content: string;
  status: ReportsType;
  writerNickname: string;
  writerEmail: string;
  createdAt: string;
}

export type ReportsServiceType = "REPORT" | "INQUIRY";
