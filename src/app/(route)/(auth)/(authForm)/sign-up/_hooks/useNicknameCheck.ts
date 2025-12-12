import { useEffect, useState } from "react";
import { useCheckNickname } from "@/app/api";
import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { NICKNAME_ERROR_MESSAGE } from "../_constant/SIGNUP_ERROR_MESSAGE";

export const useNicknameCheck = () => {
  const { addToast } = useToast();
  const { getValues } = useFormContext();

  const [nicknameValue, setNicknameValue] = useState("");
  const { data, error, isSuccess, isError } = useCheckNickname(nicknameValue);

  const handlerNickname = () => {
    if (!data) return;
    if (isSuccess) {
      addToast("사용할 수 있는 닉네임입니다.", "success");
    } else {
      const target = NICKNAME_ERROR_MESSAGE[data.code as keyof typeof NICKNAME_ERROR_MESSAGE];
      addToast(target.message, target.status);
    }
  };

  useEffect(() => {
    handlerNickname();
  }, [nicknameValue, data, error, isSuccess, isError]);

  const handlerToClickNickname = (name: string) => {
    const nickname = getValues(name);
    setNicknameValue(nickname);
  };

  return {
    handlerToClickNickname,
  };
};
