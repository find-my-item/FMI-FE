import { ButtonHTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import { SIZES } from "./constantKebabMenuButton";

interface KebabMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  size?: "large" | "small";
}

// TODO(형준): svgr 수정 시 hover, active, disabled 스타일 추가
const KebabMenuButton = ({ ariaLabel, size = "large", ...props }: KebabMenuButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="DetailMenu" size={SIZES[size]} />
    </button>
  );
};

export default KebabMenuButton;
