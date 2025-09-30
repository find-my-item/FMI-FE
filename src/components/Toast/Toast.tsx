import { cn } from "@/utils/cn";
import { ToastType } from "@/types/ToastTypes";

interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast = ({ message, type }: ToastProps) => {
  return (
    <div
      className={cn(
        "flex h-[40px] w-[260px] items-center rounded-lg px-4 text-start text-white shadow-md",
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
