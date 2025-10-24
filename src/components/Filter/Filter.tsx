import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { cn } from "@/utils/cn";

interface FilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "leading" | "trailing";
  onSelected: boolean;
  ariaLabel?: string;
}

const Filter = ({
  children,
  loading = false,
  icon,
  iconPosition,
  onSelected,
  ariaLabel = "필터",
  ...props
}: FilterProps) => {
  const finalIconPosition = icon && (iconPosition ?? "leading");

  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={cn(
        "gap-[4px] rounded-full bg-[#F5F5F5] px-[18px] py-[8px] font-[150] text-[#5D5D5D] flex-center hover:text-black active:bg-[#E4E4E4] active:text-[#9D9D9D] disabled:bg-[#E4E4E4] disabled:text-[#CFCFCF]",
        onSelected &&
          "bg-[#525252] text-white hover:text-white active:bg-[#525252] active:text-white",
        onSelected && loading && "bg-[#E4E4E4]"
      )}
    >
      {loading ? (
        <Icon name="Loading" className="animate-spin" />
      ) : (
        finalIconPosition === "leading" && icon && <span>{icon}</span>
      )}
      {!loading && children}
      {!loading && finalIconPosition === "trailing" && icon && <span>{icon}</span>}
    </button>
  );
};

export default Filter;
