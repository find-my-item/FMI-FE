import { useGetInquiries, useGetReport } from "@/api/fetch/admin";
import { ReportsTabType } from "../_types/ReportsTabType";
import { InquiryStatus, InquiryTargetType, ReportStatus, ReportTargetType } from "@/types";

interface UseReportsListQueryParams {
  activeTab: ReportsTabType;
  status?: ReportStatus;
  answered?: boolean;
  targetType?: ReportTargetType;
  keyword?: string;
  inquiryType?: InquiryTargetType;
  inquiryStatus?: InquiryStatus;
}

export const useReportsListQuery = ({
  activeTab,
  status,
  answered,
  targetType,
  keyword,
  inquiryType,
  inquiryStatus,
}: UseReportsListQueryParams) => {
  const reportQuery = useGetReport(
    { status, targetType, answered, keyword },
    { enabled: activeTab === "report" }
  );

  const inquiryQuery = useGetInquiries(
    { status: inquiryStatus, type: inquiryType, answered, keyword },
    { enabled: activeTab === "inquiry" }
  );

  return activeTab === "report" ? reportQuery : inquiryQuery;
};
