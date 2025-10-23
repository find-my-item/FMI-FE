import { ToastType } from "@/types/ToastTypes";
import { cn } from "@/utils/cn";
import Icon, { IconName } from "../Icon/Icon";

interface ToastProps {
  message: string;
  type: ToastType;
}

function getBgByType(type: ToastType): string {
  switch (type) {
    case "success":
      return "bg-[#46C691]";
    case "error":
      return "bg-[#FF4242]";
    case "warning":
      return "bg-[#FFC642]";
    default:
      return "bg-[#46C691]";
  }
}

function getIconByType(type: ToastType): IconName {
  switch (type) {
    case "success":
      return "Success";
    case "error":
      return "Error";
    case "warning":
      return "Warning";
    default:
      return "Success";
  }
}

function getIconBySize(type: ToastType): number {
  switch (type) {
    case "success":
      return 16;
    case "error":
      return 20;
    case "warning":
      return 10;
    default:
      return 16;
  }
}

const Toast = ({ message = "Text", type }: ToastProps) => {
  return (
    <div className="glass-card w-[300px] gap-3 rounded-lg bg-[#5D5D5D]/70 px-5 py-3 text-white shadow-md flex-center">
      <div className={cn(getBgByType(type), "h-5 w-5 rounded-full flex-center")}>
        <Icon name={getIconByType(type)} size={getIconBySize(type)} />
      </div>
      {message}
    </div>
  );
};

export default Toast;
