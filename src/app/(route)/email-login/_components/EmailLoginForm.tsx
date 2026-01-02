"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CheckBox, InputText, Button } from "@/components";
import { CHECKBOX_CONFIG } from "../_constants/CHECKBOX_CONFIG";
import { EMAIL_LOGIN_CONFIG } from "../_constants/EMAIL_LOGIN_CONFIG";
import { useState, useEffect } from "react";
import { LoginType } from "../_types/LoginType";
import useApiEmailLogin from "@/api/auth/useApiEmailLogin";
import { useErrorToast } from "@/hooks";
import { EMAIL_LOGIN_ERROR_MESSAGE } from "../_constants/EMAIL_LOGIN_ERROR_MESSAGE";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { AxiosError } from "axios";

const Page = () => {
  const router = useRouter();
  const { register, control, handleSubmit, reset } = useFormContext<LoginType>();

  const [cookie, setCookie, removeCookie] = useCookies(["email", "autoLogin"]);
  useEffect(() => {
    if (cookie.email) {
      reset({
        email: cookie.email,
        rememberId: !!cookie.email,
      });
    }
  }, []);

  const { mutate: EmailLoginMutate, error } = useApiEmailLogin();

  const checkBoxValues = useWatch({ control, name: CHECKBOX_CONFIG.map((item) => item.id) });

  const { handlerApiError } = useErrorToast();

  const onSubmit = handleSubmit((data) => {
    const filterData = {
      email: data.email,
      password: data.password,
    };

    EmailLoginMutate(filterData, {
      onSuccess: (res) => {
        router.push("/");
        console.log("res>>>", res);
        if (data.rememberId) {
          setCookie("email", data.email, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            secure: process.env.NODE_ENV === "production",
          });
        } else {
          removeCookie("email");
        }
      },
      onError: (error) => {
        handlerApiError(EMAIL_LOGIN_ERROR_MESSAGE, error.code);
      },
      // console.log("data>>>", filterData)
    });
  });

  return (
    <>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-12">
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
          <div className="flex w-full gap-3">
            {CHECKBOX_CONFIG.map((item, index) => (
              <CheckBox
                key={item.id}
                {...item}
                {...register(item.id, { required: false })}
                boxSize="w-[18px] h-[18px]"
                textStyle="text-caption1-semibold text-neutral-normal-default ml-2"
                iconSize="h-[6px]"
                state={!!checkBoxValues?.[index]}
              />
            ))}
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
