import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useCheckCode, useSendEmail } from "@/app/api";
import { useNicknameCheck } from "./useNicknameCheck";
import { ApiResponseType } from "@/types/ApiResponseType";
import { EMAIL_ERROR_MESSAGE } from "../_constant/SIGNUP_ERROR_MESSAGE";

export const useSignUpBtnClick = () => {
  const { getValues } = useFormContext();

  const [emailCodeVerified, setEmailCodeVerified] = useState(false);

  const { mutate: EmailMutate } = useSendEmail();
  const { mutate: CodeMutate } = useCheckCode();
  const [emailValue, setEmailValue] = useState("");

  const { addToast } = useToast();

  const { handlerToClickNickname } = useNicknameCheck();

  const handlerErrorEmail = (error: ApiResponseType) => {
    const target = EMAIL_ERROR_MESSAGE[error.code as keyof typeof EMAIL_ERROR_MESSAGE];
    if (target) addToast(target.message, target.status);
    else addToast("다시 시도해 주세요.", "error");
  };

  const handlerErrorCode = (error: ApiResponseType) => {
    console.log("error>> ", error);
    if (error.code === "_INVALID_CREDENTIALS") {
      addToast("인증번호가 일치하지 않아요", "warning");
    } else {
      addToast("다시 시도해 주세요.", "error");
    }
  };

  // 버튼 클릭 함수
  const handlerToClick = (name: string) => {
    if (name === "email") {
      const isEmail = getValues(name);
      setEmailValue(isEmail);
      EmailMutate(
        { email: isEmail },
        {
          onSuccess: () => addToast("인증번호가 발송되었습니다.", "success"),
          onError: () => handlerErrorEmail,
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
          onError: () => handlerErrorCode,
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
