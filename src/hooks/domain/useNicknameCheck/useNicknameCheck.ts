import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useApiCheckNickname } from "@/api/fetch/auth";
import { NICKNAME_ERROR_MESSAGE } from "./NICKNAME_ERROR_MESSAGE";

export const useNicknameCheck = () => {
  const [nicknameValue, setNicknameValue] = useState("");
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);

  const { addToast } = useToast();
  const { getValues, control } = useFormContext();

  const currentNickname = useWatch({
    control,
    name: "nickname",
  });

  useEffect(() => {
    setIsNicknameVerified(false);
  }, [currentNickname]);

  const { data, isSuccess, isError } = useApiCheckNickname(nicknameValue);

  const handleClickNickname = (name: string) => {
    const nickname = getValues(name);

    setIsNicknameVerified(false);
    setNicknameValue(nickname);
  };

  // api 호출 후
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
    handleClickNickname,
    isNicknameVerified,
    nicknameValue,
  };
};
