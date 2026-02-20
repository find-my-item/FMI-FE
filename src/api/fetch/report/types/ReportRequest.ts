import { ReportTargetType, ReportType } from "@/types";

export interface ReportRequest {
  targetType: ReportTargetType;
  targetId: number;
  reason: string;
  reportType: ReportType;
}
