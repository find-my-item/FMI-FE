"use client";

import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";

interface PopupLayoutProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const PopupLayout = ({ isOpen, onClose, children }: PopupLayoutProps) => {
  useModalLockAndEsc({ isOpen, onClose });
  const onBackdropMouseDown = useModalBackdrop({ onClose });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/30"
      onMouseDown={onBackdropMouseDown}
    >
      <div className="w-full max-w-md rounded-t-2xl bg-white px-6">{children}</div>
    </div>
  );
};

export default PopupLayout;
