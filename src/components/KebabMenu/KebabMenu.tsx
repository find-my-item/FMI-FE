import { ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { cn } from "@/utils/cn";

interface KebabMenuItem {
  text: ReactNode;
  icon?: ReactNode;
  iconPosition?: "leading" | "trailing";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

interface KebabMenuProps {
  items: KebabMenuItem[];
}

const KebabMenu = ({ items }: KebabMenuProps) => {
  const finalIconPosition = (item: KebabMenuItem) => item.icon && (item.iconPosition ?? "leading");

  return (
    <div className="grid w-max auto-cols-auto grid-flow-row">
      {items.map((item, index) => (
        <button
          key={index}
          disabled={item.disabled || item.loading}
          onClick={item.onClick}
          className={cn(
            "grid auto-cols-max grid-flow-col items-center justify-center gap-[8px] border-b border-white bg-[#F5F5F5] px-[28px] py-[16px] text-[#5D5D5D] hover:text-black active:bg-[#E4E4E4] active:text-[#9D9D9D] disabled:bg-[#E4E4E4] disabled:text-[#9D9D9D]",
            index === 0 && "rounded-t-[20px]",
            items.length === ++index && "rounded-b-[20px]"
          )}
        >
          {item.loading ? (
            <Icon name="Loading" className="animate-spin" />
          ) : (
            finalIconPosition(item) === "leading" && item.icon && <span>{item.icon}</span>
          )}
          {!item.loading && item.text}
          {!item.loading && finalIconPosition(item) === "trailing" && item.icon && (
            <span>{item.icon}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default KebabMenu;
