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
      return "bg-[#FF5C5C]";
    case "warning":
      return "bg-[#FFC642]";
    default:
      return "bg-[#46C691]";
  }
}

// TODO(지권): Error 아이콘 없음 및 피그마 아이콘 이슈
function getIconByType(type: ToastType): IconName {
  switch (type) {
    case "success":
      return "Success";
    // case "error":
    //   return "Error";
    case "warning":
      return "Warning";
    default:
      return "Success";
  }
}

const Toast = ({ message = "Text", type }: ToastProps) => {
  return (
    <div className="glass-card min-w-[260px] gap-3 rounded-lg bg-[#5D5D5D]/70 px-5 py-3 text-white shadow-md flex-center">
      <div className={cn(getBgByType(type), "h-5 w-5 rounded-full flex-center")}>
        <Icon name={getIconByType(type)} />
      </div>
      {message}
    </div>
  );
};

export default Toast;
