import { cn } from "@/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

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

export default HomeFilter;
