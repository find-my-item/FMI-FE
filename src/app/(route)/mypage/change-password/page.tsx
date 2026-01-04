"use client";

import { DetailHeader } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { MypageChangePwForm } from "./_components";

interface ChangeEmailType {
  email: string;
  emailAuth: number;
  password: string;
  passwordConfirm: string;
}

const page = () => {
  const methods = useForm<ChangeEmailType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="h-dvh w-full">
      <DetailHeader title="비밀번호 변경" />
      <FormProvider {...methods}>
        <MypageChangePwForm />
      </FormProvider>
    </div>
  );
};

export default page;
