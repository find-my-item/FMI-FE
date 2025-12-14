"use client";
"use no memo";

import { DetailHeader } from "@/components";
import Link from "next/link";
import { Logo } from "../../_components";
import { FormProvider, useForm } from "react-hook-form";
import EmailLoginForm from "./_components/EmailLoginForm";

type loginType = {
  email: string;
  password: string;
  rememberId: boolean;
  autoLogin: boolean;
};

const Page = () => {
  const methods = useForm<loginType>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  return (
    <>
      <DetailHeader title="이메일 로그인" />
      <div className="flex min-h-screen w-full gap-6 px-5 flex-col-center">
        <Logo />

        <FormProvider {...methods}>
          <EmailLoginForm />
        </FormProvider>

        {/* 회원확인 여부 */}
        <div className="flex h-11 w-full justify-center text-caption1-semibold text-neutralInversed-strong-default">
          <Link href="/find-pw" className="p-3">
            비밀번호 찾기
          </Link>
          <hr aria-hidden="true" className="h-4 self-center border-l border-gray-300" />
          <Link href="/sign-up" className="p-3">
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
