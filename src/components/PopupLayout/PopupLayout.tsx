"use client";

import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";

interface PopupLayoutProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const PopupLayout = ({ isOpen, onClose, children }: PopupLayoutProps) => {
  if (!isOpen) return null;

  useModalLockAndEsc({ isOpen, onClose });
  const onBackdropMouseDown = useModalBackdrop({ onClose });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/30"
      onMouseDown={onBackdropMouseDown}
    >
      {children}
    </div>
  );
};

export default PopupLayout;
