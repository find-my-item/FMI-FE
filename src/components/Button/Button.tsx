import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "@/components/Icon/Icon";

type Size = "big" | "medium" | "small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outlined" | "inversed";
  hierarchy?: "normal" | "subtle";
  size?: Size;
  iconPosition?: "leading" | "trailing";
  icon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = "solid",
  hierarchy = "normal",
  size = "medium",
  iconPosition,
  icon,
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const sizeStyles: Record<Size, string> = {
    big: "h-[44px] px-[20px] font-[150]",
    medium: "h-[40px] px-[14px] text-[14px] font-[140]",
    small: "min-w-[64px] h-[36px] px-[12px] text-[12px] font-[130]",
  };
  const loadingSpinnerSize = {
    big: 20,
    medium: 18,
    small: 16,
  };

  const variantStyles = {
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
  } as const;

  const variantClass =
    variant === "solid" ? variantStyles.solid[hierarchy] : variantStyles[variant].base;

  const glassCard = variant === "solid" && "glass-card";

  const finalIconPosition = icon && (iconPosition ?? "leading");

  const baseStyles =
    "flex-center gap-[8px] min-w-[80px] rounded-[10px] leading-[150%] transition-all duration-150";
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantClass} ${glassCard} ${className}`;

  return (
    <button disabled={disabled || loading} className={combinedStyles} {...props}>
      {loading ? (
        <Icon name="Loading" className="animate-spin" size={loadingSpinnerSize[size]} />
      ) : (
        finalIconPosition === "leading" && icon && <span>{icon}</span>
      )}
      {!loading && children}
      {!loading && finalIconPosition === "trailing" && icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
