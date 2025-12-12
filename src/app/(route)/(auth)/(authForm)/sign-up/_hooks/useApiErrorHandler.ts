import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/types";
import { ApiResponseType } from "@/types/ApiResponseType";

export const useApiErrorHandler = () => {
  const { addToast } = useToast();

  const handleApiErrorHandler = (
    error: ApiResponseType,
    error_constant: Record<string, { message: string; status: ToastType }>
  ) => {
    const target = error_constant[error.code as keyof typeof error_constant];
    if (target) {
      addToast(target.message, target.status);
    } else {
      addToast("잠시 후 다시 시도해 주세요.", "error");
    }
  };

  return { handleApiErrorHandler };
};
