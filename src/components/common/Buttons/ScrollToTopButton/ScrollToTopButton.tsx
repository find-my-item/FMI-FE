"use client";

import { useEffect, useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { cn } from "@/utils";

const SCROLL_TOP_HIDE_THRESHOLD_PX = 200;

/**
 * @author hyungjun
 *
 * 스크롤 시 화면 우측 하단 등에 노출되는 "맨 위로 이동" 버튼 컴포넌트입니다.
 * 클릭 시 페이지 최상단으로 부드럽게 스크롤하며,
 * 스크롤 위치가 상단에서 200px 이내일 때는 자동으로 숨겨집니다.
 * `onHide`로 부모에서 강제로 숨길 수 있습니다.
 * 컴포넌트의 위치는 부모 컴포넌트에서 정해야 합니다.
 *
 * @param onHide - `true`일 경우 스크롤 위치와 관계없이 버튼을 숨깁니다. (기본값: `false`)
 *
 * @example
 * ```tsx
 * <ScrollToTopButton />
 * ```
 *
 * @example
 * ```tsx
 * // 조건부로 숨기기
 * <ScrollToTopButton onHide={isModalOpen} />
 * ```
 */

interface ScrollToTopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onHide?: boolean;
}

const ScrollToTopButton = ({ onHide = false }: ScrollToTopButtonProps) => {
  const [isNearTop, setIsNearTop] = useState(true);

  const handleScrollToTop = () => setIsNearTop(window.scrollY < SCROLL_TOP_HIDE_THRESHOLD_PX);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollToTop, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollToTop);
  }, [handleScrollToTop]);

  if (onHide || isNearTop) return null;

  return (
    <button
      aria-label="스크롤 맨 위로 이동"
      className={cn(
        "glass-card h-[70px] w-[70px] rounded-full bg-fill-brand-subtle-default flex-center",
        "hover:bg-fill-brand-subtle-hover",
        "active:bg-fill-brand-subtle-pressed",
        "disabled:bg-fill-brand-subtle-disabled"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="ScrollTopArrow" size={32} />
    </button>
  );
};

export default ScrollToTopButton;
