"use client";

import { DetailHeader } from "@/components/layout";
import { GuestInquiriesView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="비회원 문의 내역" />

      <GuestInquiriesView />
    </>
  );
};

export default page;
