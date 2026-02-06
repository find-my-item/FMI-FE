import { DetailHeader } from "@/components/layout";
import { ReportsView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="신고/문의 내역" />
      <h1 className="sr-only">관리자 신고/문의 내역</h1>

      <ReportsView />
    </>
  );
};

export default page;
