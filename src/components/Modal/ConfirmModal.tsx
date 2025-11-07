import type { ReactNode } from "react";
import { cn } from "@/utils";
import Icon, { Props as IconProps } from "../Icon/Icon";
import { sizeMap, style } from "./CONST_MODAL";
import ModalLayout from "./_internal/ModalLayout";

/**
 * 확인 모달 컴포넌트입니다.
 *
 * @param title - 모달 제목
 * @param content - 모달 내용
 * @param icon - 아이콘(이름/크기/라벨만 사용)
 * @param isOpen - 모달 열림 여부
 * @param onClose - 닫기 핸들러(ESC/백드롭 포함)
 * @param onConfirm - 확인 클릭 핸들러
 * @param onCancel - 취소 클릭 핸들러
 * @param size - 모달 크기. 기본값은 `"medium"`
 *
 * @example
 * ```tsx
 * <ConfirmModal
 *   title="제목"
 *   content="내용"
 *   icon={{ name: "Logo", size: 24, title: "로고" }}
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   onConfirm={onConfirm}
 *   onCancel={onCancel}
 *   size="medium"
 * />
 * ```
 */
interface ConfirmModalProps {
  title: ReactNode;
  content: ReactNode;
  icon?: Pick<IconProps, "name" | "size" | "title">;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  size?: "small" | "medium";
}

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  content,
  icon,
  onConfirm,
  onCancel,
  size = "medium",
}: ConfirmModalProps) => {
  const buttons = [
    { key: "cancel", label: "취소", onClick: onCancel, className: style.cancelBtn },
    { key: "confirm", label: "확인", onClick: onConfirm, className: style.confirmBtn },
  ] as const;

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      className={cn("gap-[24px] p-6 flex-col-center", sizeMap[size])}
    >
      <div className="gap-[16px] flex-col-center">
        {icon && (
          <div className="h-[48px] w-[48px] rounded-full bg-fill-neutralInversed-normal-enteredSelected flex-center">
            <Icon name={icon.name} size={icon.size} title={icon.title} className="text-white" />
          </div>
        )}
        <div className="gap-[4px] text-center flex-col-center">
          <div className="text-h3-semibold text-layout-header-default">{title}</div>
          <div className="text-body2-regular text-layout-body-default">{content}</div>
        </div>
      </div>

      <div className="w-full gap-2 flex-center">
        {buttons.map((b) => (
          <button
            key={b.key}
            type="button"
            className={cn(style.baseBtn, b.className)}
            onClick={b.onClick}
          >
            {b.label}
          </button>
        ))}
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
