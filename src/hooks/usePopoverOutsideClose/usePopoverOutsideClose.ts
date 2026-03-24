import { useEffect } from "react";

/**
 * @author hyungjun
 *
 * Popover(anchor + content) 외부를 클릭했을 때 닫기 콜백을 실행하는 훅입니다.
 *
 * 포털로 렌더된 드롭다운/팝오버처럼 기준 요소와 실제 레이어가 분리된 UI에서 사용합니다.
 *
 * @param isOpen - popover 열림 상태
 * @param anchorRef - 기준(트리거) 요소 ref
 * @param popoverRef - popover 레이어 요소 ref
 * @param onClose - 외부 클릭 시 실행할 닫기 콜백
 */

const usePopoverOutsideClose = (
  isOpen: boolean,
  anchorRef: React.RefObject<HTMLDivElement | null>,
  popoverRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideAnchor = anchorRef.current && !anchorRef.current.contains(target);
      const isOutsidePopover = popoverRef.current && !popoverRef.current.contains(target);

      if (isOutsideAnchor && isOutsidePopover) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, anchorRef, popoverRef, onClose]);
};

export default usePopoverOutsideClose;
