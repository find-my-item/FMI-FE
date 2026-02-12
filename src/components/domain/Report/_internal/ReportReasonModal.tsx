"use client";

import { FormEvent, useEffect, useState } from "react";
import { REPORT_REASONS } from "./REPORT_REASONS";
import { createPortal } from "react-dom";
import { Button, RadioOptionItem } from "@/components/common";
import { ReportReason } from "./ReportTypes";
import { useModalLockAndEsc } from "@/hooks";

interface ReportReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: ReportReason | null;
  setReportType: (reason: ReportReason) => void;
}

const ReportReasonModal = ({
  isOpen,
  onClose,
  reportType,
  setReportType,
}: ReportReasonModalProps) => {
  const [tempSelectedReportReason, setTempSelectedReportReason] = useState<ReportReason | null>(
    reportType ?? null
  );
  useModalLockAndEsc({ isOpen, onClose });

  useEffect(() => {
    if (isOpen) {
      setTempSelectedReportReason(reportType ?? null);
    }
  }, [reportType, isOpen]);

  if (!isOpen) return null;

  const handleSelectReportReason = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tempSelectedReportReason) {
      setReportType(tempSelectedReportReason);
      onClose();
    }
  };

  const handleRadioChange = (selectedId: string) => {
    const selectedReason = REPORT_REASONS.find((reason) => reason.id === selectedId);
    if (selectedReason) {
      setTempSelectedReportReason(selectedReason);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <form
        className="animate-modal-slide-up absolute bottom-0 flex h-[671px] w-full max-w-[390px] flex-col rounded-t-[20px] bg-white py-10"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSelectReportReason}
      >
        <h1 className="mb-8 text-center text-h2-medium text-layout-header-default">
          신고 사유 선택
        </h1>
        <fieldset className="flex flex-col gap-[2px]">
          {REPORT_REASONS.map((reason) => (
            <RadioOptionItem
              key={reason.id}
              option={{ value: reason.id, label: reason.label }}
              selected={tempSelectedReportReason?.id ?? ""}
              onChange={handleRadioChange}
              inputName="reportReason"
            />
          ))}
        </fieldset>
        <div className="mt-auto px-5">
          <Button className="w-full" disabled={!tempSelectedReportReason} type="submit">
            선택하기
          </Button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default ReportReasonModal;
