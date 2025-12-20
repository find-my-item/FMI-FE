import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useApiCheckCode, useApiSendEmail } from "@/app/api";
import { useNicknameCheck } from "./useNicknameCheck";
import { useErrorToast } from "@/hooks";
import { EMAIL_ERROR_MESSAGE, EMAIL_CHECK_CODE_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";

export const useSignUpBtnClick = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const [emailValue, setEmailValue] = useState("");

  const { addToast } = useToast();

  const { getValues, trigger } = useFormContext();

  const { mutate: EmailMutate } = useApiSendEmail();
  const { mutate: CodeMutate } = useApiCheckCode();
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
        EmailMutate(
          { email: inputValue },
          {
            onSuccess: () => {
              addToast("인증번호가 발송되었습니다.", "success");
              setIsDisabled(false);
              setIsBtnDisabled(false);
              setEmailValue(inputValue);
            },
            onError: (error) => {
              console.log("error>>> ", error);
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
              setIsBtnDisabled(true);
            },
            onError: (error) => handlerApiError(EMAIL_CHECK_CODE_MESSAGE, error.code),
          }
        );
      } else if (name === "nickname") {
        handlerToClickNickname(name);
      }
    }
  };

  return {
    handlerToClick,
    isDisabled,
    isBtnDisabled,
  };
};
