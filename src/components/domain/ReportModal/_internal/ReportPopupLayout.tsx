"use client";

import { useModalBackdrop } from "@/hooks";
import { ReactNode } from "react";

interface ReportPopupLayoutProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const ReportPopupLayout = ({ isOpen, onClose, children }: ReportPopupLayoutProps) => {
  useModalBackdrop({ onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      <div
        className="h-[100dvh] w-full max-w-[390px] border bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ReportPopupLayout;
