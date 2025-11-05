"use client";

import { useEffect, useCallback } from "react";

/**
 *
 * @author jikwon
 *
 * 모달이 열렸을 때 스크롤을 방지하고, `ESC` 키를 누르면 모달을 닫습니다.
 *
 * @example
 * ```tsx
 * const { isOpen, setIsOpen } = useState(false);
 * useModalLockAndEsc({
 *   isOpen,
 *   onClose: () => setIsOpen(false),
 * });
 * ```
 *
 */
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

/**
 * 모달 배경(Backdrop)을 클릭했을 때,
 * 배경을 클릭한 경우에만 모달을 닫는 이벤트 핸들러를 반환합니다.
 *
 * @example
 * ```tsx
 * const onBackdropClick = useModalBackdrop({
 *   onClose: () => setIsOpen(false),
 * });
 *
 * return (
 *   <div className="modal-backdrop" onMouseDown={onBackdropClick}>
 *     <div className="modal-content">...</div>
 *   </div>
 * );
 * ```
 *
 */
export const useModalBackdrop = ({ onClose }: { onClose?: () => void }) => {
  const onBackdropMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose?.();
    },
    [onClose]
  );

  return onBackdropMouseDown;
};
