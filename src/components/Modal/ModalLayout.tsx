"use client";

import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useEffect, useCallback } from "react";

// 모달 스크롤 방지, ESC 키로 모달 닫기
const useModalLockAndEsc = ({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) => {
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);
};

// 모달 뒷 배경 클릭으로 모달 닫기
const useModalBackdrop = ({ onClose }: { onClose?: () => void }) => {
  const onBackdropMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose?.();
    },
    [onClose]
  );

  return onBackdropMouseDown;
};

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
          "w-[90vw] max-w-[600px] rounded-[20px] bg-white border border-gray-200",
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
