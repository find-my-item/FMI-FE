import { AdminDetailGuestInquiry } from "@/api/fetch/admin";
import {
  DetailContent,
  DetailStatusHeader,
} from "../../reports/[reportsType]/[id]/_components/_internal";

interface AdminDetailSectionProps {
  data: AdminDetailGuestInquiry;
}

const AdminDetailSection = ({ data }: AdminDetailSectionProps) => {
  const { requestStatus, status } = data;

  return (
    <>
      <section
        aria-label="신고/문의 내용"
        className="space-y-[14px] border-b border-flatGray-50 px-5 py-[30px]"
      >
        <DetailStatusHeader requestStatus={requestStatus} status={status} />

        <DetailContent data={data} />
      </section>
    </>
  );
};

export default AdminDetailSection;
