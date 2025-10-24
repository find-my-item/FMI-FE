import { ButtonHTMLAttributes } from "react";
import Icon from "../Icon/Icon";

interface KebabMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  size?: "large" | "small";
}

// svgr 수정 시 hover, active, disabled 스타일 추가
const KebabMenuButton = ({ ariaLabel, size = "large", ...props }: KebabMenuButtonProps) => {
  const sizes = {
    large: 24,
    small: 20,
  };

  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="DetailMenu" size={sizes[size]} />
    </button>
  );
};

export default KebabMenuButton;
