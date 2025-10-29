import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { SIZE_STYLES, LOADING_SPINNER_SIZE, VARIANT_STYLES, BASE_STYLES } from "./constantButton";
import { Props } from "@/components/Icon/Icon";

/**
 * @author hyungjun
 *
 * 다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.
 * `variant`, `hierarchy`, `size` 조합으로 시각적 스타일을 제어하며,
 * 아이콘과 로딩 스피너를 함께 사용할 수 있습니다.
 *
 * @param variant - 버튼의 스타일을 지정합니다.
 * `"solid"` | `"outlined"` | `"inversed"` | `"auth"` (기본값: `"solid"`)
 *
 * @param hierarchy - 버튼의 위계를 설정합니다.
 * `"normal"` | `"subtle"` (기본값: `"normal"`)
 *
 * @param size - 버튼의 크기를 설정합니다.
 * `"big"` | `"medium"` | `"small"` (기본값: `"medium"`)
 *
 * @param iconPosition - 아이콘의 위치를 설정합니다.
 * `"leading"`(왼쪽) | `"trailing"`(오른쪽) (기본값: `"leading"`(왼쪽))
 *
 * @param icon - 버튼에 표시할 아이콘 컴포넌트의 Props입니다.
 * `name`, `size`, `className` 등을 지정할 수 있습니다.
 *
 * @param loading - 로딩 상태를 표시합니다.
 * `true`일 경우, 버튼은 비활성화되고 로딩 스피너가 표시됩니다. - boolean (기본값: `false`)
 *
 * @param ariaLabel - 접근성을 위한 버튼의 aria-label 속성입니다.
 * 기본값은 `"버튼"`입니다.
 *
 * @param children - 버튼 내부에 렌더링할 콘텐츠(텍스트 또는 요소)입니다.
 *
 * @example
 * ```tsx
 * <Button
 *   variant="solid"
 *   hierarchy="normal"
 *   size="medium"
 *   icon={{ name: "Plus" }}
 *   iconPosition="leading"
 *   onClick={handleClick}
 * >
 *   추가하기
 * </Button>
 * ```
 */

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
