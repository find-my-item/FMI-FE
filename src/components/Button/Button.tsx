import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { SIZE_STYLES, LOADING_SPINNER_SIZE, VARIANT_STYLES, BASE_STYLES } from "./constantButton";
import { Props } from "@/components/Icon/Icon";

type Size = "big" | "medium" | "small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outlined" | "inversed" | "auth";
  hierarchy?: "normal" | "subtle";
  size?: Size;
  iconPosition?: "leading" | "trailing";
  icon?: Props;
  loading?: boolean;
  ariaLabel?: string;
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
  ariaLabel = "버튼",
  ...props
}: ButtonProps) => {
  const variantClass =
    variant === "solid" ? VARIANT_STYLES.solid[hierarchy] : VARIANT_STYLES[variant].base;

  const glassCard = variant === "solid" && "glass-card";

  const finalIconPosition = icon && (iconPosition ?? "leading");

  const combinedStyles = `${BASE_STYLES} ${SIZE_STYLES[size]} ${variantClass} ${glassCard} ${className}`;

  return (
    <button
      disabled={disabled || loading}
      className={combinedStyles}
      {...props}
      aria-label={ariaLabel ?? ""}
    >
      {loading ? (
        <Icon name="Loading" className="animate-spin" size={LOADING_SPINNER_SIZE[size]} />
      ) : (
        <>
          {finalIconPosition === "leading" && icon && <Icon {...icon} />}
          {children}
          {finalIconPosition === "trailing" && icon && <Icon {...icon} />}
        </>
      )}
    </button>
  );
};

export default Button;
