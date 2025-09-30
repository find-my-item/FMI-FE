"use client";

import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";

interface DeleteModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className: string;
}

const DeleteModal = ({ isOpen, onClose, children, className }: DeleteModalProps) => {
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
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-desc"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-[90vw] max-w-[600px] rounded-[20px] border border-gray-200 bg-white",
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

export default DeleteModal;
