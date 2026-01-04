"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CheckBox, InputText, Button } from "@/components";
import { EMAIL_LOGIN_CONFIG } from "../_constants/EMAIL_LOGIN_CONFIG";
import { useEffect } from "react";
import { LoginType } from "../_types/LoginType";
import { useErrorToast } from "@/hooks";
import { EMAIL_LOGIN_ERROR_MESSAGE } from "../_constants/EMAIL_LOGIN_ERROR_MESSAGE";
import { useRouter } from "next/navigation";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import useApiEmailLogin from "@/api/fetch/auth/api/useApiEmailLogin";
import useSubmitLogin from "../_hooks/useLoginForm";
import useLoginForm from "../_hooks/useLoginForm";

const Page = () => {
  const { register, control } = useFormContext<LoginType>();
  const checkBoxValues = useWatch({ control, name: "rememberId" });

  // const router = useRouter();
  // const cookie = getCookie("email");

  // useEffect(() => {
  //   if (typeof cookie === "string") {
  //     setValue("email", cookie);
  //     setValue("rememberId", !!cookie);
  //   }
  // }, []);

  // const { mutate: EmailLoginMutate } = useApiEmailLogin();

  // const { handlerApiError } = useErrorToast();

  // const onSubmit = handleSubmit((data) => {
  //   const filterData = {
  //     email: data.email,
  //     password: data.password,
  //   };

  //   EmailLoginMutate(filterData, {
  //     onSuccess: (res) => {
  //       router.push("/");
  //       console.log("res>>>", res);
  //       if (data.rememberId) {
  //         setCookie("email", data.email, {
  //           path: "/",
  //           maxAge: 60 * 60 * 24 * 30,
  //           secure: process.env.NODE_ENV === "production",
  //         });
  //       } else {
  //         deleteCookie("email");
  //       }
  //     },
  //     onError: (error) => {
  //       handlerApiError(EMAIL_LOGIN_ERROR_MESSAGE, error.response.data.code);
  //     },
  //   });
  // });
  const { onSubmitLogin } = useLoginForm();
  return (
    <>
      <form onSubmit={onSubmitLogin} className="flex w-full flex-col gap-12">
        {/* 로그인 입력칸 */}
        <div className="flex w-full flex-col gap-3">
          {EMAIL_LOGIN_CONFIG.map((item) => (
            <InputText
              key={item.name}
              name={item.name}
              label={item.label}
              validation={item.validation}
              type={item.type}
              placeholder={item.placeholder}
              eyeShow={item.eyeShow}
            />
          ))}
          {/* 체크박스 */}
          <div className="flex w-full">
            <CheckBox
              {...register("rememberId", { required: false })}
              id="rememberId"
              label="아이디 기억하기"
              boxSize="w-[18px] h-[18px]"
              textStyle="text-caption1-semibold text-neutral-normal-default ml-2"
              iconSize="h-[6px]"
              state={!!checkBoxValues}
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div className="w-full gap-6 flex-col-center">
          <Button type="submit" ariaLabel="로그인 버튼" variant="auth">
            로그인
          </Button>
          {/* divider 구분선 */}
          <div className="flex h-4 w-full items-center">
            <hr className="h-px flex-1 bg-flatGray-100" aria-hidden />
            <span className="px-3 text-caption1-medium text-layout-body-default" aria-hidden>
              로그인이 되지 않는다면?
            </span>
            <hr className="h-px flex-1 bg-flatGray-100" />
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
