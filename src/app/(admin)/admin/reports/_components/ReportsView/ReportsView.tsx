"use client";

import { Tab } from "@/components/domain";
import { AdminFilter, AdminSearch } from "../../../_components";
import { AdminFilterItemType } from "../../../_types";
import ReportsList from "../ReportsList/ReportsList";

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
  return (
    <div className="h-base">
      <Tab
        tabs={[
          { label: "신고", key: "report" },
          { label: "문의", key: "inquiry" },
        ]}
        selected="report"
        onValueChange={(key) => console.log(key)}
      />

      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={reportsFilters} />

      <ReportsList />
    </div>
  );
};

export default ReportsView;
