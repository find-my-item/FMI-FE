import { cn } from "@/utils";
import { label, style } from "./CONST_BADGE";

/**
 * @author jikwon
 *
 * 상태를 나타내는 작은 원형 뱃지 컴포넌트입니다.
 * `variant`에 따라 배경색과 라벨이 달라집니다.
 *
 * @param variant - 뱃지의 종류를 지정합니다.
 * - `"new"`: 신규 항목 표시
 * - `"hot"`: 인기 항목 표시
 *
 * @example
 * ```tsx
 * <Badge variant="new" />
 * <Badge variant="hot" />
 * ```
 */

interface BadgeProps {
  variant: "new" | "hot";
}

function Badge({ variant }: BadgeProps) {
  return (
    <div
      className={cn(
        "h-[14px] w-[14px] rounded-full text-[8px] font-semibold text-white flex-center",
        style[variant]
      )}
    >
      {label[variant]}
    </div>
  );
}

export default Badge;
