import Icon from "@/components/Icon/Icon";
import { ButtonHTMLAttributes } from "react";

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
}

const FloatingButton = ({ ariaLabel = "플로팅 메뉴 버튼" }: FloatingButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className="glass-card h-[70px] w-[70px] rounded-full bg-[#1EB87B] p-[12px] flex-center"
    >
      <Icon name="Plus" />
    </button>
  );
};

export default FloatingButton;
