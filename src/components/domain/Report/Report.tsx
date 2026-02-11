"use client";

import { DetailHeader } from "@/components/layout";
import { Button, InputField } from "@/components/common";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  ReportReasonModal,
  ReportPopupLayout,
  ReportReason,
  TargetType,
  ReportSelectBox,
} from "./_internal";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

type ReportFormValues = {
  reason: string;
};

interface ReportProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: TargetType;
  targetId: number;
  invalidateKey?: string[];
}

const Report = ({ isOpen, onClose, targetType, targetId, invalidateKey }: ReportProps) => {
  const [openReportReasonModal, setOpenReportReasonModal] = useState(false);
  const [reportType, setReportType] = useState<ReportReason | null>(null);
  const { mutate: report, isPending } = useAppMutation("auth", "/reports", "post");
  const toast = useToast();
  const queryClient = useQueryClient();
  const methods = useForm<ReportFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const reasonValueCount = methods.watch("reason");
  const isDisabled = !reportType || isPending || reasonValueCount.length < 10;

  const onSubmit = ({ reason }: ReportFormValues) => {
    if (isDisabled) return;

    const reportRequest = {
      targetType,
      targetId,
      reason,
      reportType: reportType.value,
    };

    report(reportRequest, {
      onSuccess: () => {
        methods.reset();
        setReportType(null);
        toast.addToast("신고가 접수되었어요", "success");
        invalidateKey && queryClient.invalidateQueries({ queryKey: invalidateKey });
        onClose();
      },
      onError: () => {
        toast.addToast("신고에 실패했습니다.", "error");
      },
    });
  };

  return (
    <ReportPopupLayout isOpen={isOpen} onClose={onClose}>
      <DetailHeader title="신고하기" onBack={onClose} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-10 p-5">
            <ReportSelectBox
              reportType={reportType}
              setOpenReportReasonModal={setOpenReportReasonModal}
            />
            <InputField
              name="reason"
              label="신고 내용 (선택)"
              placeholder="신고 사유를 입력해주세요. (최대 300자)"
              validation={{
                minLength: { value: 10, message: "10자 이상 입력해주세요." },
              }}
              maxLength={300}
            />
          </div>

          <div className="fixed bottom-0 w-[390px] border-t border-flatGray-50 px-4 pb-8 pt-3">
            <Button type="submit" className="w-full" disabled={isDisabled}>
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
