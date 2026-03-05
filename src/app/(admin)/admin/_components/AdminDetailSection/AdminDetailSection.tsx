import { AdminDetailGuestInquiry, AdminDetailReports } from "@/api/fetch/admin";
import { ReplyStatus } from "@/types";
import {
  DetailContent,
  DetailStatusHeader,
} from "../../reports/[reportsType]/[id]/_components/_internal";

interface AdminDetailSectionProps {
  data?: AdminDetailGuestInquiry | AdminDetailReports;
}

const AdminDetailSection = ({ data }: AdminDetailSectionProps) => {
  if (!data) return null;

  const { requestStatus, status } =
    "type" in data
      ? data.type === "REPORT"
        ? { requestStatus: data.reportStatus, status: data.reportStatus }
        : { requestStatus: data.inquiryStatus, status: data.inquiryStatus }
      : { requestStatus: data.requestStatus, status: data.status };

  return (
    <>
      <section
        aria-label="신고/문의 내용"
        className="space-y-[14px] border-b border-flatGray-50 px-5 py-[30px]"
      >
        <DetailStatusHeader
          requestStatus={requestStatus}
          status={status as unknown as ReplyStatus}
        />

        <DetailContent data={data} />
      </section>
    </>
  );
};

export default AdminDetailSection;
