"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CheckBox, InputText, Button } from "@/components";
import { CHECKBOX_CONFIG } from "../_constants/CHECKBOX_CONFIG";
import { EMAIL_LOGIN_CONFIG } from "../_constants/EMAIL_LOGIN_CONFIG";
import { useState, useEffect } from "react";
import { LoginType } from "../_types/LoginType";

const Page = () => {
  const [autoLogin, setAutoLogin] = useState(false);

  const { register, control, handleSubmit } = useFormContext<LoginType>();

  const checkBoxValues = useWatch({ control, name: CHECKBOX_CONFIG.map((item) => item.id) });

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
    if (data.rememberId) localStorage.setItem("rememberId", data.email);
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
