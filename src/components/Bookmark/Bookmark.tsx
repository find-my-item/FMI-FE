import { ButtonHTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import { SIZES } from "./_constant/bookmark";

interface BookmarkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  isActive: boolean;
  size?: "large" | "medium" | "small";
}

// TODO(형준): svgr 세팅 변경 시 isActive 별 색깔 수정
const Bookmark = ({
  ariaLabel = "즐겨찾기 추가",
  isActive,
  size = "medium",
  ...props
}: BookmarkProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Star" size={SIZES[size]} />
    </button>
  );
};

export default Bookmark;
