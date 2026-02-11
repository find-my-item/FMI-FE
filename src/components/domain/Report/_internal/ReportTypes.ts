import { REPORT_REASONS } from "./REPORT_REASONS";

export type ReportReason = (typeof REPORT_REASONS)[number];

export type TargetType = "POST" | "COMMENT" | "USER" | "CHAT";
