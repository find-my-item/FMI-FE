import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { ApiSignUpType, useApiSignUp } from "@/api/fetch/auth";
import { useErrorToast } from "@/hooks";
import { SIGNUP_ERROR_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";

export const useSignUpSubmit = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate: SignUpMutate } = useApiSignUp();
  const { handlerApiError } = useErrorToast();

  const submitSignUp = (data: ApiSignUpType) => {
    SignUpMutate(data, {
      onSuccess: () => {
        router.push("/email-login");
        addToast("회원가입이 완료되었어요.", "success");
      },
      onError: (error) => handlerApiError(SIGNUP_ERROR_MESSAGE, error.code),
    });
  };

  return {
    submitSignUp,
  };
};
