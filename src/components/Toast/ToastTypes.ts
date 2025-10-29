import { ToastType } from "@/types/ToastTypes";
import { IconName } from "../Icon/Icon";

export const TOAST_CONFIG = {
  success: { bg: "bg-[#46C691]", icon: "Success", size: 16 },
  error: { bg: "bg-[#FF4242]", icon: "Error", size: 20 },
  warning: { bg: "bg-[#FFC642]", icon: "Warning", size: 10 },
} satisfies Record<ToastType, { bg: string; icon: IconName; size: number }>;
