"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ReportPopupLayoutProps {
  isOpen: boolean;
  children: ReactNode;
}

const ReportPopupLayout = ({ isOpen, children }: ReportPopupLayoutProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div role="presentation" className="fixed inset-0 z-[9999] flex items-end justify-center">
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
