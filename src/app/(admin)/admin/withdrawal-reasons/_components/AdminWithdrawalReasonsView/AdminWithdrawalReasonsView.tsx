"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { AdminFilter, AdminSearch } from "../../../_components";
import { PopupLayout } from "@/components/domain";
import { Button, RadioOptionItem } from "@/components/common";
import { WITHDRAWAL_REASON_OPTIONS } from "../../_constants/WITHDRAWAL_REASON_OPTIONS";
import { WithdrawalReasonType } from "../../_types/WithdrawalReasonType";

// 인증 API를 호출하므로 SSR에서 완전히 제외
const AdminWithdrawalReasonList = dynamic(
  () => import("../AdminWithdrawalReasonList/AdminWithdrawalReasonList"),
  { ssr: false }
);

const AdminWithdrawalReasonsView = () => {
  const [reason, setReason] = useState<WithdrawalReasonType>("");
  const [pendingReason, setPendingReason] = useState<WithdrawalReasonType | null>(null);

  const WithdrawalReasonsFilters = [
    {
      label: WITHDRAWAL_REASON_OPTIONS.find((option) => option.value === reason)?.label ?? "유형",
      onSelected: !!reason,
      onClick: () => setPendingReason(reason),
    },
  ];

  const handleApply = () => {
    setReason(pendingReason as WithdrawalReasonType);
    setPendingReason(null);
  };

  return (
    <>
      <div className="h-base">
        <AdminSearch placeholder="이메일 또는 사유를 입력해 주세요." onEnter={() => {}} />

        <AdminFilter filters={WithdrawalReasonsFilters} />

        <ErrorBoundary toastMessage="유저 탈퇴 사유를 불러오는 중 오류가 발생했어요">
          <AdminWithdrawalReasonList reason={reason} />
        </ErrorBoundary>
      </div>

      {pendingReason !== null && (
        <PopupLayout
          isOpen={pendingReason !== null}
          onClose={() => setPendingReason(null)}
          className="w-full gap-8 px-5 py-10 flex-col-center"
        >
          <h2 className="text-h2-medium text-layout-header-default">탈퇴 유형 선택</h2>
          <div className="w-full">
            {WITHDRAWAL_REASON_OPTIONS.map((option) => (
              <RadioOptionItem
                key={option.value}
                option={option}
                selected={pendingReason}
                onChange={(value) => setPendingReason(value as WithdrawalReasonType)}
                inputName="withdrawalReason"
              />
            ))}
          </div>
          <Button className="w-full" onClick={handleApply}>
            적용하기
          </Button>
        </PopupLayout>
      )}
    </>
  );
};

export default AdminWithdrawalReasonsView;
