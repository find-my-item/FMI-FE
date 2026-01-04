"use client";

import { DetailHeader } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { MypageChangeEmailForm } from "./_components";

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
      <DetailHeader title="이메일 변경" />
      <FormProvider {...methods}>
        <MypageChangeEmailForm />
      </FormProvider>
    </div>
  );
};

export default page;
