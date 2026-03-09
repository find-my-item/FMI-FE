"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tab } from "@/components/domain";
import { AdminSearch } from "../../../_components";
import ReportsList from "../ReportsList/ReportsList";
import { ReportsTabType } from "../../_types/ReportsTabType";
import { REPORTS_TAB } from "../../_constants/REPORTS_TAB";
import { ReportsFilter } from "../_internal";
import { InquiryStatus, ReportStatus } from "@/types";
import { normalizeEnumValue } from "@/utils";

const ReportsView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? undefined;
  const [activeTab, setActiveTab] = useState<ReportsTabType>("report");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("status");
    params.delete("answered");

    router.replace(`/admin/reports?${params.toString()}`);
  }, [activeTab]);

  const handleKeywordSearch = (newKeyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newKeyword === params.get("keyword")) return;

    if (!newKeyword) {
      params.delete("keyword");
    } else {
      params.set("keyword", newKeyword);
    }

    router.replace(`/admin/reports?${params.toString()}`);
  };

  const reportStatus = normalizeEnumValue<ReportStatus>(searchParams.get("status"));
  const inquiryStatus = normalizeEnumValue<InquiryStatus>(searchParams.get("status"));

  const answered =
    searchParams.get("answered") !== null ? searchParams.get("answered") === "true" : undefined;

  return (
    <div className="h-base">
      <Tab
        tabs={REPORTS_TAB}
        selected={activeTab}
        onValueChange={(key) => setActiveTab(key as ReportsTabType)}
        className="sticky left-0 top-[56px]"
      />

      <AdminSearch onEnter={handleKeywordSearch} defaultValue={keyword} />

      <ReportsFilter currentParams={searchParams} activeTab={activeTab} />

      <ReportsList
        activeTab={activeTab}
        keyword={keyword}
        reportStatus={activeTab === "report" ? reportStatus : undefined}
        inquiryStatus={activeTab === "inquiry" ? inquiryStatus : undefined}
        answered={answered}
      />
    </div>
  );
};

export default ReportsView;
