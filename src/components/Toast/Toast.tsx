import { ToastType } from "@/types/ToastTypes";
import { cn } from "@/utils/cn/cn";
import Icon, { IconName } from "../Icon/Icon";
import { TOAST_CONFIG } from "./ToastTypes";

/**
 * @author jikwon
 *
 * 토스트 컴포넌트입니다.
 * `type`에 따라 배경색과 아이콘, 사이즈가 달라집니다.
 *
 * @param type - 토스트의 종류를 지정합니다.
 * - `"success"`: 성공 메시지를 나타냅니다.
 * - `"error"`: 오류 메시지를 나타냅니다.
 * - `"warning"`: 경고 메시지를 나타냅니다.
 *
 * @example
 * ```tsx
 * <Toast message="Text" type="success" />
 * <Toast message="Text" type="error" />
 * <Toast message="Text" type="warning" />
 * ```
 */

interface ToastProps {
  message: string;
  type: ToastType;
}

function getToastConfig(type: ToastType) {
  return TOAST_CONFIG[type] ?? TOAST_CONFIG.success;
}

const Toast = ({ message = "Text", type }: ToastProps) => {
  const { bg, icon, size } = getToastConfig(type);
  return (
    <div className="glass-card w-[300px] gap-3 rounded-lg bg-toast px-5 py-3 text-body1-semibold text-neutralInversed-normal-enteredSelected shadow-md flex-center">
      <div className={cn(bg, "h-5 w-5 rounded-full flex-center")}>
        <Icon name={icon} size={size} />
      </div>
      {message}
    </div>
  );
};

export default Toast;
