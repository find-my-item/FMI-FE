"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import { useHorizontalDragScroll } from "@/hooks";
import { FILTER_ITEMS } from "./FILTER_ITEMS";

interface HomeFilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onSelected: boolean;
  ariaLabel: string;
}

// TODO(형준): 필터 선택 쿼리스트링으로 관리하도록 변경 예정
const HomeFilter = ({ children, onSelected, ariaLabel, ...props }: HomeFilterProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "rounded-full px-[18px] py-2 text-body1-semibold transition-colors flex-center",
        !onSelected &&
          "text-neutralInversed-normal-default bg-fill-neutralInversed-normal-default hover:text-black hover:bg-fill-neutralInversed-normal-hover active:text-neutralInversed-normal-pressed active:bg-fill-neutralInversed-normal-preesed disabled:text-neutralInversed-normal-disabled disabled:bg-fill-neutralInversed-normal-disabled",
        onSelected &&
          "border border-fg-brand-strongUseThis-default text-brand-strongUseThis-default bg-fill-neutralInversed-normal-default hover:text-brand-strongUseThis-hover active:text-brand-strongUseThis-pressed active:bg-fill-neutralInversed-normal-default",
        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const HomeFilterSection = ({ isHidden = false }: { isHidden?: boolean }) => {
  const { ref, onMouseDown } = useHorizontalDragScroll();

  if (isHidden) return null;

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      className="sticky top-0 z-10 -mx-5 flex gap-2 border-b border-divider-default bg-white pb-[14px] pl-5 no-scrollbar"
    >
      {FILTER_ITEMS.map((item) => (
        <HomeFilter key={item.value} ariaLabel={item.label} onSelected={false}>
          {item.label}
        </HomeFilter>
      ))}
    </div>
  );
};

export default HomeFilterSection;
