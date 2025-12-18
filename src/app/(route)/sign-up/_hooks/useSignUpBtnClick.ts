import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useApiCheckCode, useApiSendEmail } from "@/app/api";
import { useNicknameCheck } from "./useNicknameCheck";
import { EMAIL_CHECK_CODE_MESSAGE, EMAIL_ERROR_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";
import { useErrorToast } from "@/hooks";

export const useSignUpBtnClick = () => {
  const { getValues } = useFormContext();

  const [emailCodeVerified, setEmailCodeVerified] = useState(false);

  const { mutate: EmailMutate } = useApiSendEmail();
  const { mutate: CodeMutate } = useApiCheckCode();
  const [emailValue, setEmailValue] = useState("");

  const { addToast } = useToast();

  const { handlerToClickNickname } = useNicknameCheck();
  const { handlerApiError } = useErrorToast();

  // 버튼 클릭 함수
  const handlerToClick = (name: string) => {
    if (name === "email") {
      const isEmail = getValues(name);
      setEmailValue(isEmail);
      EmailMutate(
        { email: isEmail },
        {
          onSuccess: () => addToast("인증번호가 발송되었습니다.", "success"),
          onError: (error) => handlerApiError(EMAIL_ERROR_MESSAGE, error.code),
        }
      );
    } else if (name === "emailAuth") {
      const codeValue = getValues(name);
      CodeMutate(
        { email: emailValue, code: codeValue },
        {
          onSuccess: () => {
            setEmailCodeVerified(true);
            addToast("인증되었습니다.", "success");
          },
          onError: (error) => handlerApiError(EMAIL_CHECK_CODE_MESSAGE, error.code),
        }
      );
    } else if (name === "nickname") {
      handlerToClickNickname(name);
    }
  };

  return {
    handlerToClick,
    emailCodeVerified,
  };
};
