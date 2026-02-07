import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/types";

const useErrorToast = () => {
  const { addToast } = useToast();

  const handlerApiError = (
    errorConstant: Record<string, { message: string; status: ToastType }>,
    errorCode: string
  ) => {
    const target = errorConstant[errorCode as keyof typeof errorConstant];
    if (target) {
      addToast(target.message, target.status);
    } else {
      addToast("잠시 후 다시 시도해 주세요.", "error");
    }
  };

  return { handlerApiError };
};

export default useErrorToast;
