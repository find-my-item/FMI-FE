import AdminReportsItem from "../../../_components/AdminReportsItem/AdminReportsItem";
import { MOCK_ADMIN_INQUIRY_LIST, MOCK_ADMIN_REPORT_LIST } from "@/mock/data";
import { toInquiryItemVM, toReportItemVM } from "../../../_utils/toReportsItemVM/toReportsItemVM";
import { ReportsTabType } from "../../_types/ReportsTabType";

interface ReportsListProps {
  activeTab: ReportsTabType;
}

const ReportsList = ({ activeTab }: ReportsListProps) => {
  const isReport = activeTab === "report";

  return (
    <section aria-label="신고/문의 목록">
      <ul className="flex flex-col gap-2">
        {isReport
          ? MOCK_ADMIN_REPORT_LIST.map((item, index) => (
              <AdminReportsItem key={index} data={toReportItemVM(item)} />
            ))
          : MOCK_ADMIN_INQUIRY_LIST.map((item, index) => (
              <AdminReportsItem key={index} data={toInquiryItemVM(item)} />
            ))}
      </ul>
    </section>
  );
};

export default ReportsList;
