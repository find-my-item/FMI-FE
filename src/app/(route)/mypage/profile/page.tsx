"use client";

import { DetailHeader, InputText, Button, Icon } from "@/components";
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
      {/* <div className="flex min-h-screen w-full flex-col"> */}
      <DetailHeader title="프로필 설정" />
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex min-h-screen w-full flex-col">
          <div className="flex justify-center py-[30px]">
            <div className="relative h-[80px] w-[80px]">
              <Icon name="UserProfile" size={80} />
              <button className="absolute left-[52px] top-[52px] h-[28px] w-[28px] rounded-full bg-[#f5f5f5] flex-center">
                <Icon name="CameraBorder" size={16} />
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-5 p-5">
            {MYPAGE_PROFILE_INPUT.map((item) => (
              <InputText key={item.name} {...item}>
                {item.children}
              </InputText>
            ))}
          </div>

          <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-divider-default bg-white px-4 py-3">
            <Button type="button" variant="auth" ariaLabel="회원가입 폼 버튼">
              설정 완료
            </Button>
          </div>
        </form>
      </FormProvider>
      {/* </div> */}
    </Suspense>
  );
};

export default page;
