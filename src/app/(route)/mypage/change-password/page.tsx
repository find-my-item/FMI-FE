"use client";

import { DetailHeader } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { MypageChangePwForm } from "./_components";

interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const page = () => {
  const methods = useForm<ChangePasswordType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="w-full h-base">
      <DetailHeader title="비밀번호 변경" />
      <FormProvider {...methods}>
        <MypageChangePwForm />
      </FormProvider>
    </div>
  );
};

export default page;
