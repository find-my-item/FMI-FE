import { DetailHeader } from "@/components/layout";
import { GuestInquiriesDetailView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="비회원 문의 내역" />
      <GuestInquiriesDetailView />
    </>
  );
};

export default page;
