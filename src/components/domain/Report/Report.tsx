"use client";

import { DetailHeader } from "@/components/layout";
import { Button, Icon, InputField, RequiredText } from "@/components/common";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ReportReasonModal from "./_internal/ReportReasonModal";
import { ReportReason } from "./_internal/REPORT_REASONS";

type ReportFormValues = {
  report: string;
};

const Report = () => {
  const [openReportReasonModal, setOpenReportReasonModal] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState<ReportReason | null>(null);
  const { addToast } = useToast();
  const router = useRouter();
  const methods = useForm<ReportFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const watchReport = methods.watch("report");

  const onSubmit = (data: ReportFormValues) => {
    if (!selectedReportReason || !data.report) return;
    addToast("신고가 접수되었습니다.", "success");
    router.replace("/chat");
  };

  return (
    <>
      <DetailHeader title="신고하기" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-[40px] p-[20px]">
            <div className="flex flex-col gap-1">
              <label className="text-body2-regular text-layout-body-default">
                신고 사유 <RequiredText />
              </label>
              <button
                type="button"
                onClick={() => setOpenReportReasonModal(true)}
                className={cn(
                  "flex items-center justify-between rounded-[10px] border border-neutral-normal-default px-[20px] py-[18px] text-body1-medium",
                  selectedReportReason
                    ? "text-neutral-normal-enteredSelected"
                    : "text-neutral-normal-placeholder"
                )}
              >
                {selectedReportReason ? selectedReportReason.label : "신고 사유를 선택해 주세요."}
                <Icon name="ArrowDown" size={24} />
              </button>
            </div>
            <InputField
              name="report"
              label="신고 내용 (선택)"
              placeholder="신고 사유를 입력해주세요. (최대 300자)"
              validation={{ maxLength: { value: 300, message: "300자 이내로 입력해주세요." } }}
              maxLength={299}
            />
          </div>

          <div className="fixed bottom-0 w-[390px] border-t border-flatGray-50 px-[16px] pb-[32px] pt-[12px]">
            <Button
              type="submit"
              className="w-full"
              disabled={!watchReport || !selectedReportReason}
            >
              차단 및 신고하기
            </Button>
          </div>
        </form>
      </FormProvider>
      <ReportReasonModal
        isOpen={openReportReasonModal}
        onClose={() => setOpenReportReasonModal(false)}
        selectedReportReason={selectedReportReason}
        setSelectedReportReason={setSelectedReportReason}
      />
    </>
  );
};

export default Report;
