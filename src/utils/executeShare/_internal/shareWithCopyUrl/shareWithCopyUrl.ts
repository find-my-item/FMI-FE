import { ToastType } from "@/types/ToastTypes";

export const shareWithCopyUrl = async (
  url: string,
  addToast: (message: string, type: ToastType) => void
) => {
  try {
    await navigator.clipboard.writeText(url);
    addToast("링크를 클립보드에 복사했어요", "success");
  } catch {
    addToast("클립보드 복사에 실패했어요", "error");
  }
};
