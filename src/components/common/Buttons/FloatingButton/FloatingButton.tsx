import { ButtonHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils";

/**
 * @author hyungjun
 *
 * @description
 * 화면 우측 하단 등 특정 위치에 표시되는 플로팅 액션 버튼(FAB) 컴포넌트입니다.
 * 주로 새로운 콘텐츠 작성, 채팅 열기 등의 주요 액션을 수행할 때 사용합니다.
 * mode에 따라 아이콘이 달라집니다. (post: FloatingPlus, notice: Pencil)
 *
 * @param ariaLabel - 접근성을 위한 버튼 라벨 텍스트입니다. 기본값은 `"플로팅 메뉴 버튼"`입니다.
 * @param buttonClassName - 버튼 컨테이너에 적용할 커스텀 클래스명입니다.
 * @param iconClassName - 아이콘에 적용할 커스텀 클래스명입니다.
 * @param mode - 버튼 용도에 따른 모드입니다. `"post"`(기본): 게시글 작성용 플러스 아이콘, `"notice"`: 공지 작성용 연필 아이콘.
 *
 * @example
 * ```tsx
 * <FloatingButton ariaLabel="게시글 작성" mode="post" onClick={() => router.push("/write/post")} />
 * ```
 *
 * @example
 * ```tsx
 * <FloatingButton ariaLabel="공지 작성" mode="notice" onClick={() => router.push("/admin/notice/write")} />
 * ```
 */

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  buttonClassName?: string;
  iconClassName?: string;
  mode?: "post" | "notice";
}

const FloatingButton = ({
  ariaLabel = "플로팅 메뉴 버튼",
  buttonClassName,
  iconClassName,
  mode = "post",
  ...props
}: FloatingButtonProps) => {
  const iconName = mode === "post" ? "FloatingPlus" : "Pencil";

  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "h-[70px] w-[70px] rounded-full p-3 transition-colors duration-150 flex-center",
        "glass-card bg-opacity-70 bg-fill-brand-strong-default",
        "hover:bg-fill-brand-strong-hover",
        "disabled:bg-fill-brand-strong-disabled",
        buttonClassName
      )}
      {...props}
    >
      <Icon name={iconName} size={32} className={iconClassName} />
    </button>
  );
};

export default FloatingButton;
