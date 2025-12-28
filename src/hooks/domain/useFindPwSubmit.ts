import { useState } from "react";
import { useApiFindPw } from "@/api/fetch/find-pw/useApiFindPw";
import useErrorToast from "./useErrorToast";
import { FIND_PW_ERROR } from "@/constants";
import { ApiFindPwType } from "@/types";

const useFindPwSubmit = () => {
  const [email, setEmail] = useState("");
  const { mutate } = useApiFindPw();
  const { handlerApiError } = useErrorToast();

  const onSubmitFindPassword = (data: ApiFindPwType) => {
    mutate(data, {
      onSuccess: () => {
        setEmail(data.email);
      },
      onError: (error) => {
        handlerApiError(FIND_PW_ERROR, error.code);
      },
    });
  };

  return {
    onSubmitFindPassword,
    email,
  };
};

export default useFindPwSubmit;
