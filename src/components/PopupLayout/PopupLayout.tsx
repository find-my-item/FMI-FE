"use client";

import { cn } from "@/utils/cn";
import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";

interface PopupLayoutProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

const PopupLayout = ({ isOpen, onClose, children, className }: PopupLayoutProps) => {
  useModalLockAndEsc({ isOpen, onClose });
  const onBackdropMouseDown = useModalBackdrop({ onClose });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/30"
      onMouseDown={onBackdropMouseDown}
    >
      <div className={cn("w-full max-w-md rounded-t-2xl bg-white px-6", className)}>{children}</div>
    </div>
  );
};

export default PopupLayout;
