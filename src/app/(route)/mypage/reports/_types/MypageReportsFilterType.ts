import { ReportType } from "@/types";

export type ReportStatusFilterValue = ReportType | undefined;

export interface ReportStatusFilterState {
  reportStatus: ReportStatusFilterValue;
}
