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
    // TODO(수현): 디자인 토큰 변경 필요
    normal:
      "text-brand-subtle-default bg-fill-brand-strong-default bg-opacity-70 hover:bg-fill-brand-strong-hover active:bg-fill-brand-strong-pressed active:text-brand-strongUseThis-pressed disabled:bg-fill-brand-strong-disabled disabled:text-brand-subtle-disabled",
    subtle:
      "text-brand-strongUseThis-default bg-fill-brand-subtle-default hover:bg-fill-brand-subtle-hover hover:text-brand-strongUseThis-hover active:bg-fill-brand-subtle-pressed active:text-brand-strongUseThis-pressed disabled:bg-fill-brand-subtle-disabled disabled:text-brand-normal-disabled",
  },
  outlined: {
    base: "text-neutral-normal-default border border-neutral-normal-default hover:text-black hover:border-neutral-normal-hover active:bg-fill-neutral-normal-pressed active:text-neutral-normal-preesed active:border-neutral-normal-pressed disabled:bg-fill-neutral-normal-disabled disabled:text-neutral-normal-disabled disabled:border-neutral-normal-disabled focus:outline-none focus:border-brand-normal-default/70 focus:text-brand-normal-default",
  },
  inversed: {
    base: "text-neutralInversed-strong-default bg-fill-neutralInversed-strong-default bg-opacity-[4%] hover:bg-opacity-[8%] hover:text-neutralInversed-strong-hover hover:bg-fill-neutralInversed-strong-hover active:bg-opacity-[8%] active:text-neutralInversed-strong-pressed disabled:text-neutralInversed-strong-disabled disabled:bg-fill-neutralInversed-strong-disabled",
  },
  auth: {
    base: "w-full h-[44px] flex-center gap-1 rounded-[10px] bg-fill-brand-normal-default font-semibold text-brand-subtle-default disabled:bg-fill-brand-normal-disabled disabled:text-brand-subtle-disabled",
  },
} as const;

export const BASE_STYLES =
  "flex-center gap-[8px] min-w-[80px] rounded-[10px] transition-all duration-150";
