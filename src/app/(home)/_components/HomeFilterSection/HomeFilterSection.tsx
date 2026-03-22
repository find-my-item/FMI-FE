"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import { useHorizontalDragScroll } from "@/hooks";
import { FILTER_ITEMS } from "./FILTER_ITEMS";
import { Icon } from "@/components/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { POST_TYPE } from "../../_constants/QUERY_PARAMS";

interface HomeFilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onSelected: boolean;
  ariaLabel: string;
}

const HomeFilter = ({ children, onSelected, ariaLabel, ...props }: HomeFilterProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center gap-1 rounded-full px-[18px] py-2 text-body1-semibold transition-colors flex-center",
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

type PostFilterChipValue = "all" | "lost" | "find";

const getSelectedPostFilterFromQuery = (postType: string | null): PostFilterChipValue => {
  if (postType === "lost") return "lost";
  if (postType === "find") return "find";
  return "all";
};

const HomeFilterSection = ({ isHidden = false }: { isHidden?: boolean }) => {
  const { ref, onMouseDown } = useHorizontalDragScroll();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const postTypeParam = searchParams.get(POST_TYPE)?.toLowerCase() ?? null;

  if (isHidden) return null;

  const selectedPostFilter = getSelectedPostFilterFromQuery(postTypeParam);

  const setPostTypeQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(POST_TYPE);
    } else {
      params.set(POST_TYPE, value);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      className="sticky top-0 z-10 -mx-5 flex gap-2 border-b border-divider-default bg-white pb-[14px] pl-5 no-scrollbar"
    >
      {FILTER_ITEMS.map((item) => {
        const isCategory = item.value === "category";
        const onSelected = !isCategory && item.value === selectedPostFilter;

        return (
          <HomeFilter
            key={item.value}
            ariaLabel={item.label}
            onSelected={onSelected}
            onClick={!isCategory ? () => setPostTypeQuery(item.value) : undefined}
          >
            {item.label}
            {isCategory && <Icon name="ArrowDown" size={12} />}
          </HomeFilter>
        );
      })}
    </div>
  );
};

export default HomeFilterSection;
