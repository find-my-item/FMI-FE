import { ButtonHTMLAttributes } from "react";
import Icon from "../Icon/Icon";

interface BookmarkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  isActive: boolean;
  size?: "large" | "medium" | "small";
}

// svgr 세팅 변경 시 isActive 별 색깔 수정
const Bookmark = ({
  ariaLabel = "즐겨찾기 추가",
  isActive,
  size = "medium",
  ...props
}: BookmarkProps) => {
  const sizes = {
    large: 30,
    medium: 24,
    small: 16,
  };

  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Star" size={sizes[size]} />
    </button>
  );
};

export default Bookmark;
