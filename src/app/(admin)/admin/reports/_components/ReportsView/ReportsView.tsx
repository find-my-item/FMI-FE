"use client";

import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<ReportsTabType>("report");

  return (
    <div className="h-base">
      <Tab
        tabs={REPORTS_TAB}
        selected={activeTab}
        onValueChange={(key) => setActiveTab(key as ReportsTabType)}
      />

      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={reportsFilters} />

      <ReportsList activeTab={activeTab} />
    </div>
  );
};

export default ReportsView;
