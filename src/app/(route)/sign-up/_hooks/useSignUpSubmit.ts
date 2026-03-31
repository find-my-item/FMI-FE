import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { ApiSignUpType, useApiSignUp } from "@/api/fetch/auth";
import { SIGNUP_ERROR_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";
import { useErrorToast } from "@/hooks/domain";
import { usePermissionStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

export const useSignUpSubmit = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate: SignUpMutate } = useApiSignUp();
  const { handlerApiError } = useErrorToast();
  const { setFirstSignUp } = usePermissionStore();
  const queryClient = useQueryClient();

  const submitSignUp = (data: ApiSignUpType) => {
    SignUpMutate(data, {
      onSuccess: () => {
        setFirstSignUp(true);
        queryClient.clear();

        router.replace("/");
        addToast("회원가입이 완료되었어요.", "success");
      },
      onError: (error) => {
        const errorCode = error?.response?.data.code;
        if (errorCode) {
          handlerApiError(SIGNUP_ERROR_MESSAGE, errorCode);
        }
      },
    });
  };

  return {
    submitSignUp,
  };
};
