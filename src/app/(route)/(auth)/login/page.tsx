"use client";

import { ButtonStyle } from "../(authForm)/sign-up/_constant/authStyle";
import Link from "next/link";
import { cn } from "@/utils";
import { Icon, Button } from "@/components";
import { Logo } from "../_components";

const Page = () => {
  return (
    <div className="min-h-screen w-full gap-8 flex-col-center">
      <Logo />

      {/* button */}
      <div className="flex w-full flex-col gap-3 px-5 text-body1-semibold">
        <Button
          type="submit"
          ariaLabel="카카오 로그인 버튼"
          className={cn(
            ButtonStyle,
            "!text-flatGray-900 bg-fill-accent-kakao hover:bg-fill-accent-kakao"
          )}
        >
          <Icon name="KakaoLogin" size={14} />
          카카오로 3초 만에 시작하기
        </Button>
        <Link
          href={"/email-login"}
          className={cn(
            ButtonStyle,
            "border border-neutral-normal-default !text-neutral-normal-default bg-fill-neutral-normal-default"
          )}
          aria-label="로그인 버튼"
        >
          <Icon name="Mail" size={20} /> 이메일로 로그인
        </Link>
      </div>

      {/* divider 구분선 */}
      <div className="flex h-[18px] w-full items-center px-5">
        <hr className="h-px flex-1 bg-flatGray-50" />
        <span className="px-3 text-caption1-medium text-layout-body-default">또는</span>
        <hr className="h-px flex-1 bg-flatGray-50" />
      </div>

      {/* 회원확인 여부 */}
      <div className="h-11">
        <span className="text-caption1-medium text-neutral-normal-placeholder">
          아직 회원이 아니신가요?
        </span>
        <Link
          href="/sign-up"
          className={cn(
            "p-3 text-caption1-semibold text-neutralInversed-strong-default",
            "transition-colors hover:text-flatGreen-500"
          )}
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Page;
