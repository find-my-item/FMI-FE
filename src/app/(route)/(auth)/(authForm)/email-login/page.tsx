"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import { InputStyle } from "../../_constant/authStyle";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Icon from "@/components/Icon/Icon";
import CheckBox from "../../../../../components/CheckBox/CheckBox";
import { useFormContext } from "react-hook-form";
import Input from "@/components/Input/Input";
import Logo from "../_components/Logo";

const Page = () => {
  const [show, setShow] = useState(false);

  const methods = useFormContext();

  const onSubmit = methods.handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <div className="flex-col-center flex min-h-screen w-full gap-6 px-5">
      {/* 로고 */}
      <Logo />

      <form onSubmit={onSubmit} className="flex w-full flex-col gap-10">
        {/* 로그인 입력칸 */}
        <div className="flex w-full flex-col gap-3">
          <Input name="email" type="text" placeholder="이메일을 입력해주세요." />

          <div className="relative">
            <Input
              name="password"
              type={show ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              className={cn(InputStyle, "relative")}
            />
            <Button
              className="absolute right-3 top-1/2 -translate-y-1/2 outline-none"
              type="button"
              aria-label={show ? "비밀번호 보기" : "비밀번호 숨기기"}
              onClick={() => setShow(!show)}
            >
              <Icon name={show ? "EyeOpen" : "EyeOff"} size={16} />
            </Button>
          </div>

          {/* 체크박스 */}
          <div className="flex w-full gap-3 text-[14px] text-[#9D9D9D]">
            <CheckBox children="아이디 기억하기" name="rememberID" />
            <CheckBox children="자동 로그인" name="autoLogin" />
          </div>
        </div>
        {/* </div> */}

        {/* 로그인 버튼 */}
        <div className="flex-col-center w-full gap-6">
          <Button children="로그인" type="submit"></Button>
          {/* divider 구분선 */}
          <div className="flex h-4 w-full items-center">
            <hr className="h-px flex-1 bg-[#E4E4E4]" />
            <span className="px-3 text-[12px] text-[#9D9D9D]">로그인이 되지 않는다면?</span>
            <hr className="h-px flex-1 bg-[#E4E4E4]" />
          </div>
        </div>
      </form>

      {/* 회원확인 여부 */}
      <div className="flex h-11 w-full justify-center">
        <Link href="/find-pw" className="p-3 text-[14px] text-[#9D9D9D]">
          비밀번호 찾기
        </Link>
        <span className="h-4 self-center border-l border-gray-300" />
        <Link href="/sign-up" className="p-3 text-[14px] text-[#1EB87B]">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Page;
