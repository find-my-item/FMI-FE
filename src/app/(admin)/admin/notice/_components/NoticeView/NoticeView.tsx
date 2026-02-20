"use client";

import NoticeList from "../NoticeList/NoticeList";
import { AdminFilter, AdminSearch } from "../../../_components";
import { AdminFilterItemType } from "../../../_types";

// TODO(지권): 필터 기능 추가
const filters: AdminFilterItemType[] = [
  {
    label: "최신순",
    onSelected: false,
    onClick: () => {},
  },
];

const NoticeView = () => {
  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={filters} />

      <NoticeList />
    </div>
  );
};

export default NoticeView;
