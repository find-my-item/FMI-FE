"use client";

import { DetailHeader } from "@/components/layout";
import { Button, Icon, InputField, RequiredText } from "@/components/common";
import { cn } from "@/utils";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ReportReasonModal, ReportPopupLayout, ReportReason, TargetType } from "./_internal";

type ReportFormValues = {
  reason: string;
};

interface ReportProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: TargetType;
  targetId: number;
}

const Report = ({ isOpen, onClose, targetType, targetId }: ReportProps) => {
  const [openReportReasonModal, setOpenReportReasonModal] = useState(false);
  const [reportType, setReportType] = useState<ReportReason | null>(null);

  const methods = useForm<ReportFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: ReportFormValues) => {
    if (!reportType) return;
  };

  return (
    <ReportPopupLayout isOpen={isOpen} onClose={onClose}>
      <DetailHeader title="신고하기" onBack={onClose} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-10 p-5">
            <div className="flex flex-col gap-1">
              <label className="text-body2-regular text-layout-body-default">
                신고 사유 <RequiredText />
              </label>
              <button
                type="button"
                onClick={() => setOpenReportReasonModal(true)}
                className={cn(
                  "flex items-center justify-between rounded-[10px] border border-neutral-normal-default px-5 py-[18px] text-body1-medium",
                  reportType
                    ? "text-neutral-normal-enteredSelected"
                    : "text-neutral-normal-placeholder"
                )}
              >
                {reportType ? reportType.label : "신고 사유를 선택해 주세요."}
                <Icon name="ArrowDown" size={24} />
              </button>
            </div>
            <InputField
              name="reason"
              label="신고 내용 (선택)"
              placeholder="신고 사유를 입력해주세요. (최대 300자)"
              validation={{ maxLength: { value: 300, message: "300자 이내로 입력해주세요." } }}
              maxLength={299}
            />
          </div>

          <div className="fixed bottom-0 w-[390px] border-t border-flatGray-50 px-4 pb-8 pt-3">
            <Button type="submit" className="w-full" disabled={!reportType}>
              차단 및 신고하기
            </Button>
          </div>
        </form>
      </FormProvider>
      <ReportReasonModal
        isOpen={openReportReasonModal}
        onClose={() => setOpenReportReasonModal(false)}
        reportType={reportType}
        setReportType={setReportType}
      />
    </ReportPopupLayout>
  );
};

export default Report;
