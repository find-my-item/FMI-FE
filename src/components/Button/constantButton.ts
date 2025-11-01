type Size = "big" | "medium" | "small";

export const SIZE_STYLES: Record<Size, string> = {
  big: "h-[44px] px-[20px] font-[150]",
  medium: "h-[40px] px-[14px] text-[14px] font-[140]",
  small: "min-w-[64px] h-[36px] px-[12px] text-[12px] font-[130]",
};

export const LOADING_SPINNER_SIZE = {
  big: 20,
  medium: 18,
  small: 16,
};

export const VARIANT_STYLES = {
  solid: {
    normal:
      "text-[#F6FFFC] bg-[#1EB87B] hover:bg-[#00B76E] active:bg-[#009E53] active:text-[#98E3BD] disabled:bg-[#98E3BD] disabled:text-[#C2F1D4]",
    subtle:
      "text-[#1EB87B] bg-[#D6F8E1] hover:bg-[#C2F1D4] active:bg-[#C2F1D4] active:text-[#6ED5A7] disabled:bg-[#E3FCEE] disabled:text-[#98E3BD]",
  },
  outlined: {
    base: "text-[#5D5D5D] border border-[#CFCFCF] hover:text-[#000000] hover:border-[#ADADAD] active:bg-[#F5F5F5] active:text-[#9D9D9D] disabled:bg-[#E4E4E4] disabled:text-[#9D9D9D] disabled:border-[#CFCFCF]",
  },
  inversed: {
    base: "text-[#CFCFCF] bg-[#FFFFFF] bg-opacity-[4%] hover:bg-opacity-[8%] hover:text-[#D9D9D9] active:bg-opacity-[8%] active:text-[#D9D9D9] disabled:text-[#9D9D9D]",
  },
  auth: {
    base: "w-full h-[44px] flex-center gap-1 rounded-[10px] bg-[#98E3BD] opacity-90 font-semibold text-white",
  },
  regionSearchList: {
    base: "border-neutral-normal-default min-h-[60px] w-full border-b bg-white px-[20px] py-[20px] text-body2-medium text-neutral-strong-default text-left",
  },
} as const;

export const BASE_STYLES =
  "flex-center gap-[8px] min-w-[80px] rounded-[10px] leading-[150%] transition-all duration-150";
