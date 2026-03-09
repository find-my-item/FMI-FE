"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tab } from "@/components/domain";
import { AdminFilter, AdminSearch } from "../../../_components";
import { AdminFilterItemType } from "../../../_types";
import ReportsList from "../ReportsList/ReportsList";
import { ReportsTabType } from "../../_types/ReportsTabType";
import { REPORTS_TAB } from "../../_constants/REPORTS_TAB";

// TODO(지권): 추후 필터 기능 추가
const reportsFilters: AdminFilterItemType[] = [
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

const ReportsView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? undefined;
  const [activeTab, setActiveTab] = useState<ReportsTabType>("report");

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

  return (
    <div className="h-base">
      <Tab
        tabs={REPORTS_TAB}
        selected={activeTab}
        onValueChange={(key) => setActiveTab(key as ReportsTabType)}
        className="sticky left-0 top-[56px]"
      />

      <AdminSearch onEnter={handleKeywordSearch} defaultValue={keyword} />

      <AdminFilter filters={reportsFilters} />

      {/* TODO(지권): 기능 추가하면서 수정 예정 */}
      <ReportsList
        activeTab={activeTab}
        // status="REVIEWED"
        // answered={true}
        // targetType="CHAT"
        keyword={keyword}
        // inquiryType="ACCOUNT_LOGIN"
        // inquiryStatus="RECEIVED"
      />
    </div>
  );
};

export default ReportsView;
