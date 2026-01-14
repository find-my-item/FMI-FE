import { ButtonHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils";

/**
 * @author hyungjun
 *
 * 화면 우측 하단 등 특정 위치에 표시되는 플로팅 액션 버튼(FAB) 컴포넌트입니다.
 * 주로 새로운 콘텐츠 작성, 채팅 열기 등의 주요 액션을 수행할 때 사용합니다.
 *
 * @param ariaLabel - 접근성을 위한 버튼 라벨 텍스트입니다.
 * 기본값은 `"플로팅 메뉴 버튼"`입니다.
 * @param buttonClassName - 버튼 컨테이너에 적용할 커스텀 클래스명입니다.
 * @param iconClassName - 아이콘에 적용할 커스텀 클래스명입니다.
 *
 * @example
 * ```tsx
 * <FloatingButton
 *   ariaLabel="게시글 작성 버튼"
 *   onClick={() => router.push('/post/create')}
 * />
 * ```
 *
 * ```tsx
 * <FloatingButton
 *   ariaLabel="게시글 작성 버튼"
 *   onClick={() => router.push('/post/create')}
 *   buttonClassName="bg-fill-brand-strong-pressed"
 *   iconClassName="rotate-45"
 * />
 * ```
 */

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

const FloatingButton = ({
  ariaLabel = "플로팅 메뉴 버튼",
  buttonClassName,
  iconClassName,
  ...props
}: FloatingButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "h-[70px] w-[70px] rounded-full p-3 flex-center",
        "glass-card bg-opacity-70 bg-fill-brand-normal-default",
        buttonClassName
      )}
      {...props}
    >
      <Icon name="Plus" size={32} className={iconClassName} />
    </button>
  );
};

export default FloatingButton;
