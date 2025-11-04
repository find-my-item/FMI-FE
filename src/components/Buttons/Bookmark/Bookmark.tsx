import { ButtonHTMLAttributes } from "react";
import Icon from "@/components/Icon/Icon";
import { SIZES } from "./constantBookmark";

/**
 * @author hyungjun
 *
 * 즐겨찾기(북마크)에 사용하는 버튼입니다.
 * `isActive` 상태에 따라 활성/비활성 아이콘 색상이 달라집니다.
 *
 * @param ariaLabel - 접근성을 위한 버튼의 aria-label 속성입니다.
 * 기본값은 `"즐겨찾기 버튼"`입니다.
 *
 * @param isActive - 활성화 여부를 결정합니다 - `boolean`
 *
 * @param size - 북마크 아이콘의 사이즈를 결정합니다 - `"large" | "medium" | "small"`
 *
 * @example
 * ```tsx
 * <Badge ariaLabel="북마크 버튼" isActive={bookmarkIsActive} size="large"  />
 * ```
 */

interface BookmarkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  isActive: boolean;
  size?: "large" | "medium" | "small";
}

// TODO(형준): svgr 세팅 변경 시 isActive 별 색깔 수정
const Bookmark = ({
  ariaLabel = "즐겨찾기 버튼",
  isActive,
  size = "medium",
  ...props
}: BookmarkProps) => {
  return (
    <button {...props} aria-label={ariaLabel} aria-checked={isActive}>
      <Icon name="Star" size={SIZES[size]} />
    </button>
  );
};

export default Bookmark;
