"use client";
"use no memo";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { EmailLoginForm } from "./_components";
import { LoginFormType } from "./_types/LoginFormType";
import { DetailHeader } from "@/components/layout";
import { LogoLink } from "../_components";

const page = () => {
  const methods = useForm<LoginFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
      <DetailHeader title="이메일 로그인" />
      <h1 className="sr-only">이메일 로그인 페이지</h1>
      <main className="flex w-full gap-6 px-5 flex-col-center h-base">
        <LogoLink />

        <FormProvider {...methods}>
          <EmailLoginForm />
        </FormProvider>

        <nav className="flex h-11 w-full justify-center text-caption1-semibold">
          <Link href="/find-pw" className="p-3 text-neutral-normal-default">
            비밀번호 찾기
          </Link>
          <hr className="h-4 w-px self-center bg-flatGray-50" />
          <Link href="/sign-up" className="p-3 text-brand-normal-default">
            회원가입
          </Link>
        </nav>
      </main>
    </>
  );
};

export default page;
