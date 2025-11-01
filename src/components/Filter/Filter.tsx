import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon, { Props } from "@/components/Icon/Icon";
import { cn } from "@/utils/cn";

/**
 * @author hyungjun
 *
 * 리스트나 게시판 등에서 조건별로 필터링할 때 사용하는 버튼 컴포넌트입니다.
 * `onSelected` 상태에 따라 시각적 스타일이 달라지며,
 * 로딩 중일 경우 스피너 아이콘이 표시됩니다.
 *
 * @param children - 버튼 내부에 표시할 콘텐츠입니다. (텍스트 또는 요소)
 *
 * @param loading - 로딩 상태를 표시합니다.
 * `true`일 경우 버튼은 비활성화되고 로딩 스피너가 표시됩니다. (기본값: `false`)
 *
 * @param icon - 버튼에 표시할 아이콘 컴포넌트의 Props입니다.
 * `name`, `size`, `className` 등을 지정할 수 있습니다.
 *
 * @param iconPosition - 아이콘의 위치를 설정합니다.
 * `"leading"`(왼쪽) | `"trailing"`(오른쪽). (기본값: `"leading"`)
 *
 * @param onSelected - 필터의 선택 상태를 제어합니다.
 * `true`일 경우 활성화 스타일이 적용됩니다.
 *
 * @param ariaLabel - 접근성을 위한 라벨 텍스트입니다.
 * 실제 `aria-label` 속성에는 `"필터"` 접미사가 함께 붙습니다.
 *
 * @example
 * ```tsx
 * <Filter
 *   ariaLabel="최신순"
 *   onSelected={selectedFilter === 'recent'}
 *   icon={{ name: "ChevronDown" }}
 *   iconPosition="trailing"
 *   onClick={() => setSelectedFilter('recent')}
 * >
 *   최신순
 * </Filter>
 * ```
 */

interface FilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  icon?: Props;
  iconPosition?: "leading" | "trailing";
  onSelected: boolean;
  ariaLabel: string;
}

const Filter = ({
  children,
  loading = false,
  icon,
  iconPosition,
  onSelected,
  ariaLabel,
  ...props
}: FilterProps) => {
  const finalIconPosition = icon && (iconPosition ?? "leading");

  return (
    <button
      {...props}
      aria-label={`${ariaLabel} 필터`}
      className={cn(
        "gap-[4px] rounded-full bg-[#F5F5F5] px-[18px] py-[8px] text-body1-semibold text-[#5D5D5D] flex-center hover:text-black active:bg-[#E4E4E4] active:text-[#9D9D9D] disabled:bg-[#E4E4E4] disabled:text-[#CFCFCF]",
        onSelected &&
          "bg-[#525252] text-white hover:text-white active:bg-[#525252] active:text-white",
        onSelected && loading && "bg-[#E4E4E4]"
      )}
    >
      {loading ? (
        <Icon name="Loading" className="animate-spin" />
      ) : (
        finalIconPosition === "leading" && icon && <Icon {...icon} />
      )}
      {!loading && children}
      {!loading && finalIconPosition === "trailing" && icon && <Icon {...icon} />}
    </button>
  );
};

export default Filter;
