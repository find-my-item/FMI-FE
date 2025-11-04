type Size = "big" | "medium" | "small";

export const SIZE_STYLES: Record<Size, string> = {
  big: "h-[44px] px-[20px] text-body1-semibold",
  medium: "h-[40px] px-[14px] text-body2-semibold",
  small: "min-w-[64px] h-[36px] px-[12px] text-caption1-semibold",
};

export const LOADING_SPINNER_SIZE = {
  big: 20,
  medium: 18,
  small: 16,
};

export const VARIANT_STYLES = {
  solid: {
    normal:
      "text-brand-normal-default bg-fill-brand-normal-default bg-opacity-70 hover:bg-fill-brand-normal-hover active:bg-fill-brand-normal-pressed active:text-brand-normal-pressed disabled:bg-fill-brand-normal-disabled disabled:text-brand-normal-disabled",
    subtle:
      "text-brand-subtle-default bg-fill-brand-subtle-default hover:bg-fill-brand-subtle-hover hover:text-brand-subtle-hover active:bg-fill-brand-subtle-pressed active:text-brand-subtle-pressed disabled:bg-fill-brand-subtle-disabled disabled:text-brand-subtle-disabled",
  },
  outlined: {
    base: "text-neutral-normal-default border border-neutral-normal-default hover:text-black hover:border-neutral-normal-hover active:bg-fill-neutral-normal-pressed active:text-neutral-normal-pressed disabled:bg-fill-neutral-normal-disabled disabled:text-neutral-normal-disabled disabled:border-neutral-normal-disabled",
  },
  inversed: {
    base: "text-neutralInversed-strong-default bg-fill-neutralInversed-strong-default bg-opacity-[4%] hover:bg-opacity-[8%] hover:text-neutralInversed-strong-hover active:bg-opacity-[8%] active:text-neutralInversed-strong-pressed disabled:text-neutralInversed-strong-disabled",
  },
  auth: {
    base: "w-full h-[44px] flex-center gap-1 rounded-[10px] bg-[#98E3BD] opacity-90 font-semibold text-white",
  },
  regionSearchList: {
    base: "border-neutral-normal-default min-h-[60px] w-full border-b bg-white px-[20px] py-[20px] text-body2-medium text-neutral-strong-default text-left",
  },
} as const;

export const BASE_STYLES =
  "flex-center gap-[8px] min-w-[80px] rounded-[10px] transition-all duration-150";
