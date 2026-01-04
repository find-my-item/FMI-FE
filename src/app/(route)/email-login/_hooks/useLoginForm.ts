import useApiEmailLogin from "@/api/fetch/auth/api/useApiEmailLogin";
import { useErrorToast } from "@/hooks";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { LoginType } from "../_types/LoginType";
import { EMAIL_LOGIN_ERROR_MESSAGE } from "../_constants/EMAIL_LOGIN_ERROR_MESSAGE";

const useLoginForm = () => {
  const { handleSubmit, setValue } = useFormContext<LoginType>();
  const router = useRouter();
  const cookie = getCookie("email");
  const { mutate: EmailLoginMutate } = useApiEmailLogin();
  const { handlerApiError } = useErrorToast();

  useEffect(() => {
    if (typeof cookie === "string") {
      setValue("email", cookie);
      setValue("rememberId", !!cookie);
    }
  }, []);

  const onSubmitLogin = handleSubmit((data) => {
    const filterData = {
      email: data.email,
      password: data.password,
    };

    EmailLoginMutate(filterData, {
      onSuccess: (res) => {
        router.replace("/");
        console.log("res>>>", res);
        if (data.rememberId) {
          setCookie("email", data.email, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            secure: process.env.NODE_ENV === "production",
          });
        } else {
          deleteCookie("email");
        }
      },
      onError: (error) => {
        handlerApiError(EMAIL_LOGIN_ERROR_MESSAGE, error.response.data.code);
      },
    });
  });

  return { onSubmitLogin };
};

export default useLoginForm;
