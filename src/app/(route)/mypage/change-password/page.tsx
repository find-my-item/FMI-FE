"use client";

import { DetailHeader } from "@/components/layout";
import { FormProvider, useForm } from "react-hook-form";
import { MypageChangePwForm } from "./_components";

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
    <div className="w-full h-base">
      <DetailHeader title="비밀번호 변경" />
      <h1 className="sr-only">비밀번호 변경 페이지</h1>
      <FormProvider {...methods}>
        <MypageChangePwForm />
      </FormProvider>
    </div>
  );
};

export default page;
