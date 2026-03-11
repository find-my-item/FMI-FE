import Icon from "../Icon/Icon";

/**
 * @author jikwon
 *
 * 상태를 나타내는 작은 원형 뱃지 컴포넌트입니다.
 * `variant`에 따라 아이콘이 달라집니다.
 *
 * @param variant - 뱃지의 종류를 지정합니다.
 * - `"new"`: 신규 항목 표시
 * - `"hot"`: 인기 항목 표시
 *
 * @param size - 아이콘의 크기를 지정합니다.
 *
 * @example
 * ```tsx
 * <Badge variant="new" />
 * <Badge variant="hot" />
 * ```
 *
 * ```tsx
 * <Badge variant="new" size={16} />
 * <Badge variant="hot" size={16} />
 * ```
 */

interface BadgeProps {
  variant: "new" | "hot";
  size?: number;
}

function Badge({ variant, size = 15 }: BadgeProps) {
  const isNew = variant === "new";

  return (
    <div aria-label={isNew ? "최신 글" : "인기 글"}>
      <Icon name={isNew ? "NewBadge" : "HotBadge"} size={size} />
    </div>
  );
}

export default Badge;
