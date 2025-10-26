import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  toggleState: boolean;
  disabled?: boolean;
}

const ToggleButton = ({
  ariaLabel = "토글 버튼",
  toggleState,
  disabled,
  ...props
}: ToggleButtonProps) => {
  const finalToggleState = disabled ? false : toggleState;
  return (
    <button
      {...props}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-checked={finalToggleState}
      className={cn(
        "h-[30px] w-[64px] rounded-full bg-[#F5F5F5] p-[4px] transition-colors duration-200 disabled:bg-[#E4E4E4]",
        finalToggleState ? "bg-[#1EB87B]" : "bg-[#F5F5F5]"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-200",
          finalToggleState ? "translate-x-[34px]" : "translate-x-0"
        )}
      />
    </button>
  );
};

export default ToggleButton;
