import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useApiSignUp } from "@/app/api";
import { ApiSignUpType } from "../../types/ApiSingUpType";
import { useApiErrorToast } from "./useApiErrorToast";
import { SIGNUP_ERROR_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";

export const useSignUpSubmit = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate: SignUpMutate } = useApiSignUp();
  const { handlerApiError } = useApiErrorToast();

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
