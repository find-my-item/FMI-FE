"use client";

import { DetailHeader } from "@/components/layout";
import { AdminFilter, AdminReportsItem, AdminSearch } from "../_components";
import { MOCK_ADMIN_GUEST_INQUIRY_LIST } from "@/mock/data";
import { toGuestInquiryItemVM } from "../_utils/toReportsItemVM/toReportsItemVM";

const filters = [
  {
    label: "상태",
    onSelected: false,
    onClick: () => {},
  },
  {
    label: "답변",
    onSelected: false,
    onClick: () => {},
  },
];

const page = () => {
  return (
    <>
      <DetailHeader title="비회원 문의 내역" />
      <AdminSearch onEnter={() => {}} />
      <AdminFilter filters={filters} />
      <section aria-label="비회원 문의 목록">
        <ul>
          {Array.from({ length: 5 }).map((_, index) => (
            <AdminReportsItem
              key={index}
              data={toGuestInquiryItemVM(MOCK_ADMIN_GUEST_INQUIRY_LIST)}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default page;
