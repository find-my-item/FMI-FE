import Icon from "@/components/Icon/Icon";
import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * @author hyungjun
 *
 * 상세 위치 보기 버튼 컴포넌트입니다.
 * 버튼 내부에 위치 아이콘과 화살표 아이콘을 포함하며,
 * 텍스트를 표시할 수 있습니다.
 *
 * @param children - 버튼에 표시할 텍스트 또는 요소입니다.
 *
 * @param ariaLabel - 접근성을 위한 버튼 라벨 텍스트입니다. (기본값: `"상세 위치 보기"`)
 *
 * @example
 * ```tsx
 * <Location ariaLabel="위치 보기" onClick={() => console.log('위치 클릭')}>
 *   서울 강남구
 * </Location>
 * ```
 */

interface LocationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ariaLabel?: string;
}

const Location = ({ children, ariaLabel = "상세 위치 보기", ...props }: LocationProps) => {
  return (
    <button
      {...props}
      className="flex gap-[5px] text-[#5D5D5D] hover:text-[#000000] active:text-[#9D9D9D] disabled:text-[#9D9D9D]"
      aria-label={ariaLabel}
    >
      <Icon name="Location" />
      <span>{children}</span>
      <Icon name="ArrowRightSmall" className="ml-[1px]" />
    </button>
  );
};

export default Location;
