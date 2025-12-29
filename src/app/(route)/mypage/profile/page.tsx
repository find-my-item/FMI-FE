"use client";

import { DetailHeader, InputText } from "@/components";
import { MYPAGE_PROFILE_INPUT } from "./_constants/MYPAGE_PROFILE_INPUT";
import { FormProvider, useForm } from "react-hook-form";
import { Suspense } from "react";

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

  const onSubmit = () => {};

  return (
    <Suspense fallback="">
      <div className="flex min-h-screen w-full flex-col">
        <DetailHeader title="프로필 설정" />
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="flex justify-center py-[30px]">
              <div className="h-[80px] w-[80px] bg-slate-100" />
            </div>

            <div className="flex w-full flex-col gap-5 p-5">
              {MYPAGE_PROFILE_INPUT.map((item) => (
                <InputText key={item.name} {...item}>
                  {item.children}
                </InputText>
              ))}
            </div>
          </form>
        </FormProvider>
      </div>
    </Suspense>
  );
};

export default page;
