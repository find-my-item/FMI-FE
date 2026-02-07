"use client";

import { AdminFilter, AdminSearch } from "../../../_components";
import AdminWithdrawalReasonList from "../AdminWithdrawalReasonList/AdminWithdrawalReasonList";

// TODO(지권): 추후 필터 기능 추가
const WithdrawalReasonsFilters = [
  {
    label: "유형",
    onSelected: false,
    onClick: () => {},
  },
];

const AdminWithdrawalReasonsView = () => {
  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={WithdrawalReasonsFilters} />

      <AdminWithdrawalReasonList />
    </div>
  );
};

export default AdminWithdrawalReasonsView;
