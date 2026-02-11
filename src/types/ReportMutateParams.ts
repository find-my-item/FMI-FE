import { ReportReason } from "@/components/domain/Report/_internal/REPORT_REASONS";

export type ReportMutateParams = {
  reason: string;
  reportType: ReportReason;
};
