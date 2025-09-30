"use client";

<<<<<<< HEAD
=======
import { useForm, FormProvider } from "react-hook-form";
import { FormValue } from "../../_constant/FormData";
>>>>>>> b2cb13c (최신화 받기 전 저장)
import Button from "@/components/Button/Button";
import { ButtonStyle, InputStyle } from "../../styles/authStyle";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Icon from "@/components/Icon/Icon";
<<<<<<< HEAD
import CheckBox from "./_components/CheckBox";

const Page = () => {
  return (
    <div className="flex-col-center flex min-h-screen w-full gap-8 md:flex-row">
      {/* logo */}
      <div className="flex">
        <Icon name="Logo" size={90} title="로고" />
        <h1 className="text-[49px] font-bold text-[#1EB87B]">찾아줘!</h1>
      </div>

      <div className="flex w-full flex-col gap-3 px-5">
        {/* 로그인 입력칸 */}
        <div className="flex w-full flex-col gap-3">
=======

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
        {/* 로그인 입력칸 */}
        <div>
>>>>>>> b2cb13c (최신화 받기 전 저장)
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
        </div>
<<<<<<< HEAD

        {/* 체크박스 */}
        <div className="flex w-full gap-3 text-[14px] text-[#9D9D9D]">
          <CheckBox children="아이디 기억하기" name="rememberID" />
          <CheckBox children="자동 로그인" name="autoLogin" />
        </div>

        {/* 로그인 버튼 */}
        <div>
          <Button
            children="로그인"
            type="submit"
            className={cn(ButtonStyle, "bg-[#1EB87B] text-white")}
          />
          {/* divider 구분선 */}
          <div className="flex h-[18px] w-full items-center font-medium">
            <div className="h-px flex-1 bg-[#E4E4E4]" />
            <span className="px-3 text-[12px] text-[#9D9D9D]">로그인이 되지 않는다면?</span>
            <div className="h-px flex-1 bg-[#E4E4E4]" />
          </div>
        </div>

        {/* 회원확인 여부 */}
        <div className="flex h-11 w-full justify-center">
          <Link href="findPw" className="p-3 text-[14px] text-[#1EB87B]">
            비밀번호 찾기
          </Link>
          <span className="h-4 self-center border-l border-gray-300" />
          <Link href="/signUp" className="p-3 text-[14px] text-[#1EB87B]">
            회원가입
          </Link>
        </div>
      </div>
=======
        {/* 체크박스 */}
        <div>
          <input name="rememberID" type="checkbox" />
          <input name="autoLogin" type="checkbox" />
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div>
        <Button children="회원가입" type="submit" className={ButtonStyle} />
        {/* divider 구분선 */}
        <div className="flex items-center w-full h-[18px] px-5">
          <div className="h-px flex-1 bg-[#E4E4E4]" />
          <span className="px-3 text-[#9D9D9D] text-[12px]">로그인이 되지 않는다면?</span>
          <div className="h-px flex-1 bg-[#E4E4E4]"></div>
        </div>
      </div>
      {/* 회원확인 여부 */}
      <div className="h-11">
        <Link href="findPw" className="text-[#1EB87B] text-[14px] p-3">
          비밀번호 찾기
        </Link>
        <Link href="/signUp" className="text-[#1EB87B] text-[14px] p-3">
          회원가입
        </Link>
      </div>
>>>>>>> b2cb13c (최신화 받기 전 저장)
    </div>
  );
};

export default Page;
