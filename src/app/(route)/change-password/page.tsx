"use client";

import { FormProvider, useForm } from "react-hook-form";
import { DetailHeader } from "@/components/layout";
import { ChangePasswordForm } from "./_components";
import ChangePasswordFormV2 from "./_components/ChangePasswordFormV2/ChangePasswordFormV2";

interface ChangePasswordFormType {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const page = () => {
  const methods = useForm<ChangePasswordFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="flex flex-col h-base">
      <DetailHeader title="비밀번호 변경" />
      <h1 className="sr-only">비밀번호 변경 페이지</h1>

      <FormProvider {...methods}>
        <ChangePasswordFormV2 />
      </FormProvider>
    </div>
  );
};

export default page;
