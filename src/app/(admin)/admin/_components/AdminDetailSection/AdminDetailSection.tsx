import { ReplyStatus, ReportsType } from "@/types";
import {
  DetailContent,
  DetailStatusHeader,
} from "../../reports/[reportsType]/[id]/_components/_internal";

interface AdminDetailSectionProps {
  data: {
    title: string;
    userName: string;
    createdAt: string;
    content: string;
    status: ReportsType;
    replyStatus: ReplyStatus;
  };
}

const AdminDetailSection = ({ data }: AdminDetailSectionProps) => {
  const { status, replyStatus } = data;

  return (
    <>
      <section
        aria-label="신고/문의 내용"
        className="space-y-[14px] border-b border-flatGray-50 px-5 py-[30px]"
      >
        <DetailStatusHeader status={status} replyStatus={replyStatus} />

        <DetailContent data={data} />
      </section>
    </>
  );
};

export default AdminDetailSection;
