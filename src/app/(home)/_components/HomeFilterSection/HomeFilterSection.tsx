"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import { useHorizontalDragScroll } from "@/hooks";

interface FilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onSelected: boolean;
  ariaLabel: string;
}

const FILTER_ITEMS = [
  {
    label: "모두보기",
    value: "all",
  },
  {
    label: "분실물만",
    value: "lost",
  },
  {
    label: "습득물만",
    value: "find",
  },
  {
    label: "카테고리",
    value: "category",
  },
];

// TODO(형준): 필터 선택 쿼리스트링으로 관리하도록 변경 예정

const HomeFilter = ({ children, onSelected, ariaLabel, ...props }: FilterProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "rounded-full px-[18px] py-2 text-body1-semibold transition-colors duration-150 flex-center",
        !onSelected &&
          "text-neutralInversed-normal-default bg-fill-neutralInversed-normal-default hover:text-black hover:bg-fill-neutralInversed-normal-hover active:text-neutralInversed-normal-pressed active:bg-fill-neutralInversed-normal-preesed disabled:text-neutralInversed-normal-disabled disabled:bg-fill-neutralInversed-normal-disabled",
        onSelected &&
          "border border-[#1EB87B] text-[#1EB87B] bg-fill-neutralInversed-normal-default hover:text-[#1EB87B] active:text-[#1EB87B] active:bg-fill-neutralInversed-normal-default",
        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const HomeFilterSection = () => {
  const { ref, onMouseDown } = useHorizontalDragScroll();

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      className="-mx-5 flex gap-2 border-b border-divider-default pb-[14px] pl-5 no-scrollbar"
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
