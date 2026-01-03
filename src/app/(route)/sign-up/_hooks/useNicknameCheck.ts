import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { NICKNAME_ERROR_MESSAGE } from "../_constants/SIGNUP_ERROR_MESSAGE";
import { useApiCheckNickname } from "@/api/fetch/auth";

export const useNicknameCheck = () => {
  const { addToast } = useToast();
  const { getValues } = useFormContext();

  const [nicknameValue, setNicknameValue] = useState("");
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);

  const { data, isSuccess, isError } = useApiCheckNickname(nicknameValue);

  const handlerToClickNickname = (name: string) => {
    const nickname = getValues(name);

    setIsNicknameVerified(false);
    setNicknameValue(nickname);
  };

  useEffect(() => {
    if (!data) return;

    if (isSuccess) {
      setIsNicknameVerified(true);
      addToast("사용할 수 있는 닉네임이에요.", "success");
    } else {
      setIsNicknameVerified(false);

      const target = NICKNAME_ERROR_MESSAGE[data.code as keyof typeof NICKNAME_ERROR_MESSAGE];
      addToast(target.message, target.status);
    }
  }, [data, isSuccess, isError, addToast]);

  return {
    handlerToClickNickname,
    isNicknameVerified,
  };
};
