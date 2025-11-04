"use client";

import { useEffect, useCallback } from "react";

// 모달 스크롤 방지, ESC 키로 모달 닫기
export const useModalLockAndEsc = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) => {
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
export const useModalBackdrop = ({ onClose }: { onClose?: () => void }) => {
  const onBackdropMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose?.();
    },
    [onClose]
  );

  return onBackdropMouseDown;
};
