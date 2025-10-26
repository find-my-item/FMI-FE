import Icon from "@/components/Icon/Icon";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface LocationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ariaLabel?: string;
}

const Location = ({ children, ariaLabel = "상세 위치 보기", ...props }: LocationProps) => {
  return (
    <button
      {...props}
      className="flex gap-[5px] text-[#5D5D5D] hover:text-[#000000] active:text-[#9D9D9D] disabled:text-[#9D9D9D]"
      aria-label={ariaLabel}
    >
      <Icon name="Location" />
      <span>{children}</span>
      <Icon name="ArrowRightSmall" className="ml-[1px]" />
    </button>
  );
};

export default Location;
