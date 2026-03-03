"use client";

import { useSearchParams } from "next/navigation";
import GuestInquiriesList from "../GuestInquiriesList/GuestInquiriesList";
import { AdminSearch } from "../../../_components";
import { normalizeEnumValue } from "@/utils";
import GuestInquiriesFilter from "../GuestInquiriesFilter/GuestInquiriesFilter";

// TODO(지권): 검색 기능 추가
const GuestInquiriesView = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <GuestInquiriesFilter currentParams={searchParams} />

      <GuestInquiriesList
        status={normalizeEnumValue(params.status) ?? ""}
        answer={normalizeEnumValue(params.answer) ?? ""}
      />
    </div>
  );
};

export default GuestInquiriesView;
