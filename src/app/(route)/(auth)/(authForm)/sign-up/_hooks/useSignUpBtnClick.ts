import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";
import { useCheckCode, useSendEmail, useCheckNickname } from "@/app/api";
import { useNicknameCheck } from "./useNicknameCheck";

export const useSignUpBtnClick = () => {
  const {
    getValues,
    formState: { isValid },
  } = useFormContext();

  const [nicknameValue, setNicknameValue] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);

  const { mutate: EmailMutate } = useSendEmail();
  const { mutate: CodeMutate } = useCheckCode();
  // const { data, error, isSuccess, isError } = useCheckNickname(nicknameValue);
  const [emailValue, setEmailValue] = useState("");

  const { addToast } = useToast();

  const { handlerToClickNickname } = useNicknameCheck();

  const handlerErrorEmail = (error: ResponseType) => {
    const target = EMAIL_ERROR_MESSAGE[error.code as keyof typeof EMAIL_ERROR_MESSAGE];
    addToast(target.message, target.status);
  };

  const handlerErrorCode = (error: ResponseType) => {
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
            setCodeVerified(true);
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
  };
};
