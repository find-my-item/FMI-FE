"use client";

import { Button, DetailHeader, Icon, InputField, RequiredText } from "@/components";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, FormProvider } from "react-hook-form";

const REPORT_REASONS = [
  { value: "1", label: "실제 분실물/습득물이 아닌 내용이에요." },
  { value: "2", label: "동일한 내용이 여러 번 올라왔어요." },
  { value: "3", label: "분실물과 무관한 홍보성 게시글이에요." },
  { value: "4", label: "채팅 또는 댓글에 모욕적 표현이 있어요." },
  { value: "5", label: "물건 반환을 빌미로 금전 요구가 있어요." },
  { value: "6", label: "실제 주인이 아닌 사람이 소유를 주장해요." },
  { value: "7", label: "위 항목 외의 다른 문제를 신고해요." },
];
type ReportReason = (typeof REPORT_REASONS)[number];

const ReportReasonModal = ({
  isOpen,
  onClose,
  selectedReportReason,
  setSelectedReportReason,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedReportReason: ReportReason | null;
  setSelectedReportReason: (reason: ReportReason) => void;
}) => {
  const [tempSelectedReportReason, setTempSelectedReportReason] = useState<ReportReason | null>(
    selectedReportReason ?? null
  );

  useEffect(() => {
    if (isOpen) {
      setTempSelectedReportReason(selectedReportReason ?? null);
    }
  }, [selectedReportReason, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectReportReason = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tempSelectedReportReason) {
      setSelectedReportReason(tempSelectedReportReason);
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <form
        className="animate-modal-slide-up absolute bottom-0 flex h-[671px] w-full max-w-[390px] flex-col rounded-t-[20px] bg-white px-[20px] py-[40px]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSelectReportReason}
      >
        <h1 className="mb-[32px] text-center text-h2-medium text-layout-header-default">
          신고 사유 선택
        </h1>
        <fieldset className="flex flex-col gap-[2px]">
          {REPORT_REASONS.map((reason) => (
            <div
              key={reason.value}
              className="w-full space-x-[12px] py-[18px] text-h3-medium text-neutral-normal-default"
            >
              <input
                type="radio"
                name={"reportReason"}
                id={reason.value}
                className="cursor-pointer"
                value={reason.value}
                onChange={() => setTempSelectedReportReason(reason)}
                checked={tempSelectedReportReason?.value === reason.value}
              />
              <label htmlFor={reason.value} className="cursor-pointer">
                {reason.label}
              </label>
            </div>
          ))}
        </fieldset>
        <div className="mt-auto">
          <Button className="w-full" disabled={tempSelectedReportReason === null} type="submit">
            선택하기
          </Button>
        </div>
      </form>
    </div>,
    document.body
  );
};

type ReportFormValues = {
  report: string;
};

const ChatReportPage = () => {
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

export default ChatReportPage;
