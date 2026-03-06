"use client";

import { DetailHeader } from "@/components/layout";
import { GuestInquiriesView } from "./_components";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <DetailHeader title="비회원 문의 내역" />

      <Suspense fallback={null}>
        <GuestInquiriesView />
      </Suspense>
    </>
  );
};

export default page;
