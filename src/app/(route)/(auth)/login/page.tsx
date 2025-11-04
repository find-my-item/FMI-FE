"use client";

import Button from "@/components/Buttons/Button/Button";
import { ButtonStyle } from "../_constant/authStyle";
import Link from "next/link";
import { cn } from "@/utils/cn/cn";
import Icon from "@/components/Icon/Icon";
import { useRouter } from "next/navigation";
import Logo from "../(authForm)/_components/Logo";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full gap-8 flex-col-center">
      <Logo />

      {/* button */}
      <div className="flex w-full flex-col gap-3 px-5 text-[14px]">
        <Button
          type="submit"
          ariaLabel="카카오 로그인 버튼"
          className={cn(ButtonStyle, "bg-[#FFEA14] text-[#242424]")}
        >
          <Icon name="KakaoLogin" size={14} />
          카카오로 3초 만에 시작하기
        </Button>
        <Link
          href={"/email-login"}
          className={cn(ButtonStyle, "bg-[#E4E4E4] text-[#525252]")}
          aria-label="로그인 버튼"
        >
          <Icon name="Mail" size={20} /> 이메일로 로그인
        </Link>
      </div>

      {/* divider 구분선 */}
      <div className="flex h-[18px] w-full items-center px-5">
        <hr className="h-px flex-1 bg-[#E4E4E4]" />
        <span className="px-3 text-[12px] text-[#9D9D9D]">또는</span>
        <hr className="h-px flex-1 bg-[#E4E4E4]" />
      </div>

      {/* 회원확인 여부 */}
      <div className="h-11">
        <span className="text-[12px] font-medium text-[#9D9D9D]">아직 회원이 아니신가요?</span>
        <Link href="/sign-up" className="p-3 text-[14px] text-[#1EB87B]">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Page;
