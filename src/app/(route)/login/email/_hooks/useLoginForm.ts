import useApiEmailLogin from "@/api/fetch/auth/api/useApiEmailLogin";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EMAIL_LOGIN_ERROR_MESSAGE } from "../_constants/EMAIL_LOGIN_ERROR_MESSAGE";
import { useToast } from "@/context/ToastContext";
import { LoginFormType } from "../_types/LoginFormType";
import { useErrorToast } from "@/hooks/domain";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useLoginForm = () => {
  const { handleSubmit, setValue } = useFormContext<LoginFormType>();
  const router = useRouter();
  const cookie = getCookie("email");
  const { mutate: EmailLoginMutate } = useApiEmailLogin();
  const { addToast } = useToast();
  const { handlerApiError } = useErrorToast();

  useEffect(() => {
    if (typeof cookie === "string") {
      setValue("email", cookie);
      setValue("rememberId", !!cookie);
    }
  }, []);

  const onSubmitLogin = handleSubmit((data) => {
    if (!EMAIL_REGEX.test(data.email)) {
      addToast("아이디에 이메일을 입력해주세요.", "warning");
      return;
    }

    const filterData = {
      email: data.email,
      password: data.password,
    };

    EmailLoginMutate(filterData, {
      onSuccess: () => {
        router.replace("/");

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
