"use client";

import { useSearchParams } from "next/navigation";
import GuestInquiriesList from "../GuestInquiriesList/GuestInquiriesList";
import { AdminSearch } from "../../../_components";
import { normalizeEnumValue } from "@/utils";
import GuestInquiriesFilter from "../GuestInquiriesFilter/GuestInquiriesFilter";

const GuestInquiriesView = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <GuestInquiriesFilter />

      <GuestInquiriesList status={normalizeEnumValue(status) ?? ""} />
    </div>
  );
};

export default GuestInquiriesView;
