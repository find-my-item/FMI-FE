import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useApiCheckCode, useApiSendEmail } from "@/app/api";
import { useNicknameCheck } from "./useNicknameCheck";
import { EMAIL_CHECK_CODE_MESSAGE, EMAIL_ERROR_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";
import { useErrorToast } from "@/hooks";

export const useSignUpBtnClick = () => {
  const { getValues, trigger } = useFormContext();

  const [emailCodeVerified, setEmailCodeVerified] = useState(false);

  const { mutate: EmailMutate } = useApiSendEmail();
  const { mutate: CodeMutate } = useApiCheckCode();
  const [emailValue, setEmailValue] = useState("");

  const { addToast } = useToast();

  const { handlerToClickNickname } = useNicknameCheck();
  const { handlerApiError } = useErrorToast();

  // 버튼 클릭 함수
  const handlerToClick = async (name: string) => {
    const isValid = await trigger(name);
    if (!isValid) return;

    const rawInputValue = getValues(name);
    const inputValue = typeof rawInputValue === "string" ? rawInputValue.trim() : "";

    if (inputValue) {
      if (name === "email") {
        console.log("email>> ", inputValue);
        setTimeout(() => {
          EmailMutate(
            { email: inputValue },
            {
              onSuccess: () => addToast("인증번호가 발송되었습니다.", "success"),
              onError: (error) => handlerApiError(EMAIL_ERROR_MESSAGE, error.code),
            }
          );
        }, 300);
        setEmailValue(inputValue);
      } else if (name === "emailAuth") {
        console.log("emailAuth>> ", inputValue);
        CodeMutate(
          { email: emailValue, code: inputValue },
          {
            onSuccess: () => {
              setEmailCodeVerified(true);
              addToast("인증되었습니다.", "success");
            },
            onError: (error) => handlerApiError(EMAIL_CHECK_CODE_MESSAGE, error.code),
          }
        );
      } else if (name === "nickname") {
        console.log("nickname>> ", inputValue);
        handlerToClickNickname(name);
      }
    }
  };

  return {
    handlerToClick,
    emailCodeVerified,
  };
};
