"use client";

import { useModalBackdrop, useModalLockAndEsc } from "@/hooks";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ReportPopupLayoutProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const ReportPopupLayout = ({ isOpen, onClose, children }: ReportPopupLayoutProps) => {
  const onBackdropMouseDown = useModalBackdrop({ onClose });
  useModalLockAndEsc({ isOpen, onClose });

  if (!isOpen) return null;

  return createPortal(
    <div
      role="presentation"
      onMouseDown={onBackdropMouseDown}
      className="fixed inset-0 z-[9999] flex items-end justify-center"
    >
      <div
        className="h-dvh w-full max-w-[768px] border bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ReportPopupLayout;
