import { ToastType } from "@/types/ToastTypes";
import { cn } from "@/utils/cn";
import Icon, { IconName } from "../Icon/Icon";

interface ToastProps {
  message: string;
  type: ToastType;
}

const TOAST_CONFIG = {
  success: { bg: "bg-[#46C691]", icon: "Success", size: 16 },
  error: { bg: "bg-[#FF4242]", icon: "Error", size: 20 },
  warning: { bg: "bg-[#FFC642]", icon: "Warning", size: 10 },
} satisfies Record<ToastType, { bg: string; icon: IconName; size: number }>;

function getToastConfig(type: ToastType) {
  return TOAST_CONFIG[type] ?? TOAST_CONFIG.success;
}

const Toast = ({ message = "Text", type }: ToastProps) => {
  const { bg, icon, size } = getToastConfig(type);
  return (
    <div className="glass-card w-[300px] gap-3 rounded-lg bg-[#5D5D5D]/70 px-5 py-3 text-white shadow-md flex-center">
      <div className={cn(bg, "h-5 w-5 rounded-full flex-center")}>
        <Icon name={icon} size={size} />
      </div>
      {message}
    </div>
  );
};

export default Toast;
