"use client";
"use no memo";

import { DetailHeader, AuthLogoLink } from "@/components";
import Link from "next/link";
import EmailLoginForm from "./_components/EmailLoginForm";
import { FormProvider, useForm } from "react-hook-form";
import { LoginType } from "./_types/LoginType";

const Page = () => {
  const methods = useForm<LoginType>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false, // 입력 값 유지
    defaultValues: {
      email: localStorage.getItem("rememberId") ?? "",
      rememberId: !!localStorage.getItem("rememberId"),
      autoLogin: localStorage.getItem("autoLogin") === "true",
    },
  });

  return (
    <>
      <DetailHeader title="이메일 로그인" />
      <div className="flex min-h-screen w-full gap-6 px-5 flex-col-center">
        <AuthLogoLink />

        <FormProvider {...methods}>
          <EmailLoginForm />
        </FormProvider>

        {/* 회원확인 여부 */}
        <div className="flex h-11 w-full justify-center text-caption1-semibold">
          <Link href="/find-pw" className="p-3 text-neutral-normal-default">
            비밀번호 찾기
          </Link>
          <hr className="h-4 self-center border-l border-gray-300" />
          <Link href="/sign-up" className="p-3 text-brand-normal-default">
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
