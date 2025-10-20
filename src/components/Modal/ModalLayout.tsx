"use client";

import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className: string;
}

const ModalLayout = ({ isOpen, onClose, children, className }: ModalLayoutProps) => {
  useModalLockAndEsc({ isOpen, onClose });
  const onBackdropMouseDown = useModalBackdrop({ onClose });

  if (!isOpen) return null;

  return createPortal(
    <div
      onMouseDown={onBackdropMouseDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "rounded-[20px] border border-gray-200 bg-white",
          "flex flex-col overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalLayout;
