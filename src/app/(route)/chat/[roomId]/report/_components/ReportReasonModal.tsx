"use client";

import { FormEvent, useEffect, useState } from "react";
import { ReportReason } from "../_types/ReportReason";
import { createPortal } from "react-dom";
import { REPORT_REASONS } from "../_constants/REPORT_REASONS";
import { Button } from "@/components/common";

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

export default ReportReasonModal;
