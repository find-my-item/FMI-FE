import Icon from "@/components/Icon/Icon";
import { ButtonHTMLAttributes } from "react";

/**
 * @author hyungjun
 *
 * 화면 우측 하단 등 특정 위치에 표시되는 플로팅 액션 버튼(FAB) 컴포넌트입니다.
 * 주로 새로운 콘텐츠 작성, 채팅 열기 등의 주요 액션을 수행할 때 사용합니다.
 *
 * @param ariaLabel - 접근성을 위한 버튼 라벨 텍스트입니다.
 * 기본값은 `"플로팅 메뉴 버튼"`입니다.
 *
 * @example
 * ```tsx
 * <FloatingButton
 *   ariaLabel="게시글 작성 버튼"
 *   onClick={() => router.push('/post/create')}
 * />
 * ```
 */

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
}

const FloatingButton = ({ ariaLabel = "플로팅 메뉴 버튼" }: FloatingButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className="glass-card h-[70px] w-[70px] rounded-full bg-[#1EB87B] p-[12px] flex-center"
    >
      <Icon name="Plus" />
    </button>
  );
};

export default FloatingButton;
