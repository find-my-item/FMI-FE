import { cn } from "@/utils/cn";
import { ToastType } from "@/app/types/ToastTypes";

interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast = ({ message, type }: ToastProps) => {
  return (
    <div
      className={cn(
        "w-[260px] h-[40px] text-start flex items-center px-4 shadow-md text-white rounded-lg",
        type === "success" && "bg-green-500",
        type === "error" && "bg-red-500",
        type === "info" && "bg-blue-500"
      )}
    >
      {message}
    </div>
  );
};

export default Toast;
