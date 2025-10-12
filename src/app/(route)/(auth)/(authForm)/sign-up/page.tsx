"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { signUpInputObject } from "../../_constant/FormData";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/cn";
import { InputStyle, signUpButtonStyle } from "../../_constant/authStyle";
import Icon from "@/components/Icon/Icon";

const buttonConfig: Record<string, { text: string; className: string }> = {
  email: { text: "인증번호 발송", className: signUpButtonStyle },
  emailAuth: { text: "인증번호 확인", className: signUpButtonStyle },
  nickname: { text: "중복 확인", className: cn(signUpButtonStyle, "min-w-[100px]") },
};

const Page = () => {
  const {
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <form onSubmit={onSubmit} className="flex w-full flex-1 justify-between flex-col-center">
        <div className="flex w-full flex-col gap-5 p-4">
          {signUpInputObject.map((item) => {
            const fieldError = errors[item.name]?.message as string;
            const showError = (!!touchedFields[item.name] || isSubmitted) && !!fieldError;

            const currentButtonConfig = buttonConfig[item.name];
            return (
              <div className="flex min-h-[96px] w-full flex-col gap-2" key={item.name}>
                {/* label */}
                <label htmlFor={item.name} className="text-[14px] text-[#363636]">
                  {item.label}
                  {item.validation?.required && <span className="text-[#1EB87B]">*</span>}
                </label>

                {/* input */}
                <div className="relative flex w-full flex-row items-end gap-[10px]" key={item.name}>
                  <Input
                    name={item.name}
                    type={item.type}
                    className={cn(InputStyle, showError && "border-[#FF4242] bg-[#E4E4E4]")}
                    placeholder={item.placeholder}
                    validation={item.validation}
                    eyeShow={item.eyeShow}
                  />
                  {/* button */}
                  {currentButtonConfig && (
                    <Button className={currentButtonConfig.className}>
                      {currentButtonConfig.text}
                    </Button>
                  )}
                </div>

                {/* 에러 확인 및 규칙 안내 */}
                {(showError || item.rule) && (
                  <p className={cn("text-[12px]", showError ? "text-red-500" : "text-[#787878]")}>
                    {showError ? fieldError : item.rule}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-[#E4E4E4] bg-white px-4 py-3">
          <Button type="submit" label="회원가입 버튼">
            다음
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
