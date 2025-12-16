import { useState } from "react";
import { ApiFindPassword } from "../../app/api";
import useErrorToast from "./useErrorToast";
import { FIND_PW_ERROR } from "@/constants";

const useFindPwSubmit = () => {
  const [email, setEmail] = useState("");
  const { mutate } = ApiFindPassword();
  const { handlerApiError } = useErrorToast();

  const onSubmitFindPassword = (data: { email: string }) => {
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
