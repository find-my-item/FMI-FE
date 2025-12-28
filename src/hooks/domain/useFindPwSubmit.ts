import { useState } from "react";
import { ApiFindPwType, useApiFindPw } from "@/api/fetch/auth";
import useErrorToast from "./useErrorToast";
import { FIND_PW_ERROR } from "@/constants";

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
