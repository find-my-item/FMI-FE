"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { usePostVerifyPassword } from "@/api/fetch/user";
import { InputText, RequiredText } from "@/components/common";

const VerifyPasswordSection = () => {
  const { getValues, setError, clearErrors } = useFormContext();
  const { mutateAsync, isPending } = usePostVerifyPassword();

  const [isVerifySuccess, setIsVerifySuccess] = useState(false);

  const handleToVerifyPassword = async () => {
    const currentPassword = getValues("currentPassword");

    try {
      await mutateAsync({ currentPassword });

      clearErrors("currentPassword");
      setIsVerifySuccess(true);
    } catch {
      setIsVerifySuccess(false);

      setError("currentPassword", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  };

  const buttonDisabled = isPending || isVerifySuccess;

  return (
    <section className="flex min-h-[92px] flex-col gap-2">
      <label htmlFor="currentPassword" className="text-body2-medium text-layout-header-default">
        현재 비밀번호
        <RequiredText />
      </label>

      <InputText
        inputOption={{
          name: "currentPassword",
          type: "password",
          placeholder: "현재 비밀번호를 입력해주세요.",
          disabled: isVerifySuccess,
        }}
        btnOption={{
          btnLabel: "비밀번호 확인",
          btnOnClick: handleToVerifyPassword,
          disabled: buttonDisabled,
        }}
        caption={{
          isSuccess: isVerifySuccess,
          successMessage: "비밀번호가 일치합니다.",
        }}
      />
    </section>
  );
};

export default VerifyPasswordSection;
