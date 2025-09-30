"use client";

import Button from "@/components/Button/Button";
import { ButtonStyle } from "../styles/authStyle";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Icon from "@/components/Icon/Icon";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col-center md:flex-row gap-8">
      {/* logo */}
      <div className="flex-col-center">
        <Icon name="Logo" size={90} title="로고" />
        <h1 className="text-[#1EB87B] text-[49px] font-bold">찾아줘!</h1>
      </div>

      {/* button */}
      <div className="w-full px-5 flex flex-col gap-3 text-[14px]">
        <Button
          children="카카로로 3초 만에 시작하기"
          type="submit"
          className={cn(ButtonStyle, "bg-[#FFEA14] text-[#242424]")}
          label="로그인 버튼"
        />
        <Button
          children="이메일로 로그인"
          type="submit"
          className={cn(ButtonStyle, "bg-[#E4E4E4] text-[#525252]")}
          label="로그인 버튼"
        />
      </div>

      {/* divider 구분선 */}
      <div className="flex h-[18px] w-full items-center px-5">
        <div className="h-px flex-1 bg-[#E4E4E4]" />
        <span className="px-3 text-[#9D9D9D] text-sm text-[12px]">또는</span>
        <div className="h-px flex-1 bg-[#E4E4E4]"></div>
      </div>

      {/* 회원확인 여부 */}
      <div className="h-11">

        <span className="font-medium text-[#9D9D9D] text-[12px]">아직 회원이 아니신가요?</span>
        <Link href="/signUp" className="text-[#1EB87B] text-[14px] p-3">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Page;
