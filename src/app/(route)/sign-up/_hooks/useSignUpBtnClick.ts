import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useMemo, useState } from "react";
import useApiCheckCode from "@/api/sign-up/useApiCheckCode";
import useApiSendEmail from "@/api/sign-up/useApiSendEmail";
import { useErrorToast } from "@/hooks";
import { useNicknameCheck } from "./useNicknameCheck";
import { EMAIL_ERROR_MESSAGE, EMAIL_CHECK_CODE_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";
import { throttle } from "lodash";

export const useSignUpBtnClick = () => {
  const { getValues, trigger } = useFormContext();

  const [emailValue, setEmailValue] = useState("");

  const [isEmailAuthDisabled, setIsEmailAuthDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

  const [isEmailAuthVerified, setIsEmailAuthVerified] = useState(false);

  const { addToast } = useToast();
  const { handlerApiError } = useErrorToast();

  const { mutate: EmailMutate } = useApiSendEmail();
  const { mutate: CodeMutate } = useApiCheckCode();
  const { handlerToClickNickname } = useNicknameCheck();

  const handlerToClick = useMemo(
    () =>
      throttle(
        async (name: string) => {
          const isValid = await trigger(name);
          if (!isValid) return;

          const rawInputValue = getValues(name);
          const inputValue = typeof rawInputValue === "string" ? rawInputValue.trim() : "";

          if (inputValue) {
            if (name === "email") {
              EmailMutate(
                { email: inputValue },
                {
                  onSuccess: () => {
                    addToast("인증번호가 발송되었습니다.", "success");
                    setIsEmailAuthDisabled(false);
                    setEmailValue(inputValue);
                  },
                  onError: (error) => {
                    handlerApiError(EMAIL_ERROR_MESSAGE, error.code);
                  },
                }
              );
            } else if (name === "emailAuth") {
              CodeMutate(
                { email: emailValue, code: inputValue },
                {
                  onSuccess: () => {
                    addToast("인증되었습니다.", "success");
                    setIsEmailAuthDisabled(true);
                    setIsEmailDisabled(true);
                    setIsEmailAuthVerified(true);
                  },
                  onError: (error) => handlerApiError(EMAIL_CHECK_CODE_MESSAGE, error.code),
                }
              );
            } else if (name === "nickname") {
              handlerToClickNickname(name);
            }
          }
        },
        300,
        { leading: true, trailing: false }
      ),
    [
      trigger,
      getValues,
      EmailMutate,
      addToast,
      handlerApiError,
      CodeMutate,
      emailValue,
      handlerToClickNickname,
    ]
  );

  return {
    handlerToClick,
    isEmailAuthDisabled,
    isEmailDisabled,
    isEmailAuthVerified,
  };
};
