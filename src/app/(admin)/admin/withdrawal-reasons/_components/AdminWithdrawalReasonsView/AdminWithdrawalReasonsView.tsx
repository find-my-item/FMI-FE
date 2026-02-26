"use client";

import { useState } from "react";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { AdminFilter, AdminSearch } from "../../../_components";
import AdminWithdrawalReasonList from "../AdminWithdrawalReasonList/AdminWithdrawalReasonList";
import { WithdrawalReason } from "@/types";

// TODO(지권): 추후 필터 기능 추가
const WithdrawalReasonsFilters = [
  {
    label: "유형",
    onSelected: false,
    onClick: () => {},
  },
];

type WithdrawalReasonType = WithdrawalReason | "";

const AdminWithdrawalReasonsView = () => {
  const [reason, setReason] = useState<WithdrawalReasonType>("");

  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={WithdrawalReasonsFilters} />

      <ErrorBoundary toastMessage="유저 탈퇴 사유를 불러오는 중 오류가 발생했어요">
        <AdminWithdrawalReasonList />
      </ErrorBoundary>
    </div>
  );
};

export default AdminWithdrawalReasonsView;
