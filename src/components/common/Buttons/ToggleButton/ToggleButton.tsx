import { cn } from "@/utils";
import { ButtonHTMLAttributes } from "react";

/**
 * @author hyungjun
 *
 * ON/OFF 상태를 시각적으로 표시하는 토글 버튼 컴포넌트입니다.
 * `toggleState`에 따라 버튼 색상과 내부 원 위치가 변경되며,
 * 비활성화 상태에서는 토글 상태와 관계없이 비활성 스타일이 적용됩니다.
 *
 * @param toggleState - 버튼의 현재 토글 상태를 지정합니다.
 * `true`일 경우 ON 상태, `false`일 경우 OFF 상태입니다.
 *
 * @param disabled - 버튼을 비활성화할지 여부입니다.
 * `true`일 경우 토글이 동작하지 않고 비활성 스타일이 적용됩니다. (기본값: `false`)
 *
 * @param ariaLabel - 접근성을 위한 버튼 라벨 텍스트입니다. (기본값: `"토글 버튼"`)
 *
 * @example
 * ```tsx
 * <ToggleButton
 *   ariaLabel="알림 설정 토글"
 *   toggleState={isNotificationOn}
 *   onClick={() => setIsNotificationOn(prev => !prev)}
 * />
 * ```
 */

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  toggleState: boolean;
  disabled?: boolean;
}

const ToggleButton = ({
  ariaLabel = "토글 버튼",
  toggleState,
  disabled = false,
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
        "h-[30px] w-[64px] rounded-full p-1 transition-colors duration-200 disabled:bg-fill-neutralInversed-normal-disabled",
        finalToggleState ? "bg-fill-brand-normal-default" : "bg-labelsVibrant-tertiary"
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
