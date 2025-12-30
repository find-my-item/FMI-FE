"use client";

import { DetailHeader } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { Suspense } from "react";
import MypageProfileForm from "./_components/MypageProfileForm/MypageProfileForm";

interface MypageProfileFormType {
  profile: string;
  nickname: string;
  email: string;
  emailAuth: number;
}

const page = () => {
  const methods = useForm<MypageProfileFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <Suspense fallback="">
      <DetailHeader title="프로필 설정" />
      <FormProvider {...methods}>
        <MypageProfileForm />
      </FormProvider>
    </Suspense>
  );
};

export default page;
