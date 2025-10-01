"use client";

import Button from "@/components/Button/Button";
import { ButtonStyle, InputStyle } from "../../styles/authStyle";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Icon from "@/components/Icon/Icon";
import CheckBox from "./_components/CheckBox";

const Page = () => {
  return (
    <div className="flex-col-center flex min-h-screen w-full gap-6 md:flex-row">
      {/* 상위 박스 (로고, 입력칸, 체크박스) */}
      <div className="flex w-full flex-col gap-10 px-5">
        {/* 로고 */}
        <div className="flex-center">
          <Icon name="Logo" size={50} title="로고" />
          <h1 className="text-[39px] font-bold text-[#1EB87B]">찾아줘!</h1>
        </div>

        {/* 로그인 입력칸 */}
        <div className="flex w-full flex-col gap-3">
          <input
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요."
            className={cn(InputStyle)}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={cn(InputStyle)}
          />
          {/* 체크박스 */}
          <div className="flex w-full gap-3 text-[14px] text-[#9D9D9D]">
            <CheckBox children="아이디 기억하기" name="rememberID" />
            <CheckBox children="자동 로그인" name="autoLogin" />
          </div>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div className="flex-col-center w-full gap-6 px-5">
        <Button
          children="로그인"
          type="submit"
          className={cn(ButtonStyle, "bg-[#1EB87B] text-white")}
        />
        {/* divider 구분선 */}
        <div className="flex h-4 w-full items-center">
          <div className="h-px flex-1 bg-[#E4E4E4]" />
          <span className="px-3 text-[12px] text-[#9D9D9D]">로그인이 되지 않는다면?</span>
          <div className="h-px flex-1 bg-[#E4E4E4]"></div>
        </div>
      </div>

      {/* 회원확인 여부 */}
      <div className="flex h-11 w-full justify-center">
        <Link href="/findPw" className="p-3 text-[14px] text-[#9D9D9D]">
          비밀번호 찾기
        </Link>
        <span className="h-4 self-center border-l border-gray-300" />
        <Link href="/signUp" className="p-3 text-[14px] text-[#1EB87B]">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Page;
