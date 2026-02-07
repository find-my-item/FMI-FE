import { DetailHeader } from "@/components/layout";
import { GuestInquiriesDetailView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="비회원 문의 내역" />
      <h1 className="sr-only">비회원 문의 상세 내역</h1>

      <GuestInquiriesDetailView />
    </>
  );
};

export default page;
