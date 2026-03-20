import { ReportStatus } from "@/types";

export type ReportStatusFilterValue = ReportStatus | undefined;

export interface ReportStatusFilterState {
  reportStatus: ReportStatusFilterValue;
}
