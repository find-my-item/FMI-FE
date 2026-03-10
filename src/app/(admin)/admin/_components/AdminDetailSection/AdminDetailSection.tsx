import { AdminDetailGuestInquiry, AdminDetailReports } from "@/api/fetch/admin";
import {
  DetailContent,
  DetailStatusHeader,
} from "../../reports/[reportsType]/[id]/_components/_internal";

interface AdminDetailSectionProps {
  data?: AdminDetailGuestInquiry | AdminDetailReports;
}

const AdminDetailSection = ({ data }: AdminDetailSectionProps) => {
  if (!data) return null;

  const { requestStatus, answered } =
    "type" in data
      ? data.type === "REPORT"
        ? { requestStatus: data.reportStatus, answered: data.answered }
        : { requestStatus: data.inquiryStatus, answered: data.answered }
      : { requestStatus: data.status, answered: data.answered };

  return (
    <>
      <section
        aria-label="신고/문의 내용"
        className="space-y-[14px] border-b border-flatGray-50 px-5 py-[30px]"
      >
        <DetailStatusHeader requestStatus={requestStatus} status={answered} />

        <DetailContent data={data} />
      </section>
    </>
  );
};

export default AdminDetailSection;
