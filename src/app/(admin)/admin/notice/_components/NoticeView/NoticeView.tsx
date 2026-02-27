"use client";

import NoticeList from "../NoticeList/NoticeList";
import { AdminFilter, AdminSearch } from "../../../_components";
import { AdminFilterItemType } from "../../../_types";
import { ErrorBoundary } from "@/app/ErrorBoundary";

// TODO(지권): 필터 기능 추가
const filters: AdminFilterItemType[] = [
  {
    label: "최신순",
    onSelected: false,
    onClick: () => {},
  },
];

const NoticeView = () => {
  const handleToSearch = () => {};
  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={filters} />

      <ErrorBoundary toastMessage="공지사항 목록을 불러올 수 없어요">
        <NoticeList />
      </ErrorBoundary>
    </div>
  );
};

export default NoticeView;
