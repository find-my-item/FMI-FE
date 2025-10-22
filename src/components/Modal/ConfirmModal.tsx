import { ModalLayout } from "..";
import { cn } from "@/utils/cn";
import Icon, { IconName } from "../Icon/Icon";

type IconType = {
  name: IconName;
  size?: number;
  title?: string;
};

interface ConfirmModalProps {
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: IconType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onFalse: () => void;
  size: "small" | "medium";
}

const style = {
  baseBtn: "flex-1 flex-center font-semibold text-[16px] py-[10px] rounded-[10px]",
  trueBtn: "bg-[#1EB87B]/70 text-white glass-card",
  falseBtn: "bg-[#FFFFFF] text-gray-800 border border-[#CFCFCF]",
};

const sizeMap: Record<"small" | "medium", string> = {
  small: "w-[320px]",
  medium: "w-[400px]",
};

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  content,
  icon,
  onConfirm,
  onFalse,
  size = "medium",
}: ConfirmModalProps) => {
  const btnList = [
    {
      label: "False",
      onClick: onFalse,
      className: style.falseBtn,
    },
    {
      label: "True",
      onClick: onConfirm,
      className: style.trueBtn,
    },
  ];

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      className={cn("gap-[24px] p-6 flex-col-center", sizeMap[size])}
    >
      <div className="gap-[16px] flex-col-center">
        {icon && (
          <div className="h-[48px] w-[48px] rounded-full bg-[#525252] flex-center">
            <Icon name={icon.name} size={icon.size} title={icon.title} className="text-white" />
          </div>
        )}
        <div className="gap-[4px] flex-col-center">
          <div className="text-[18px] font-semibold leading-[140%]">{title}</div>
          <div className="text-[14px] leading-[140%]">{content}</div>
        </div>
      </div>
      <div className="w-full gap-2 flex-center">
        {btnList.map((btn) => (
          <button
            key={btn.label}
            className={cn(style.baseBtn, btn.className)}
            onClick={btn.onClick}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
