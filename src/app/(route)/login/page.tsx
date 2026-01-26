"use client";

import Link from "next/link";
import { cn } from "@/utils";
import { AuthLogoLink } from "@/components/domain";
import { Button, Icon } from "@/components/common";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const ButtonStyle = "w-full h-11 flex-center gap-1 rounded-[10px] text-body1-semibold ";

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const page = () => {
  const { addToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      addToast("세션이 만료되었어요. 다시 로그인 해주세요.", "warning");

      router.replace("/login");
    }
  }, [searchParams, addToast, router]);

  return (
    <div className="min-h-screen w-full gap-8 flex-col-center">
      <AuthLogoLink />

      {/* button */}
      <div className="flex w-full flex-col gap-3 px-5">
        <Button
          type="submit"
          ignoreBase
          ariaLabel="카카오 로그인 버튼"
          onClick={() => (window.location.href = kakaoURL)}
          className={cn(
            ButtonStyle,
            "text-flatGray-900 bg-fill-accent-kakao hover:bg-fill-accent-kakao"
          )}
        >
          <Icon name="KakaoLogin" size={14} />
          카카오로 3초 만에 시작하기
        </Button>
        <Button
          as={Link}
          href={"/email-login"}
          ignoreBase
          className={cn(ButtonStyle, "text-white bg-fill-brand-normal-default")}
          aria-label="로그인 버튼"
        >
          <Icon name="Mail" size={20} className="text-white" /> 이메일로 로그인
        </Button>
      </div>

      {/* divider 구분선 */}
      <div className="flex h-[18px] w-full items-center px-5">
        <hr className="h-px flex-1 bg-flatGray-50" aria-hidden={true} />
        <span className="px-3 text-caption1-medium text-layout-body-default">또는</span>
        <hr className="h-px flex-1 bg-flatGray-50" aria-hidden={true} />
      </div>

      {/* 회원확인 여부 */}
      <div className="h-11">
        <span className="text-caption1-medium text-neutral-normal-placeholder">
          아직 회원이 아니신가요?
        </span>
        <Link
          href="/sign-up"
          className={cn(
            "Inversed-strong-default p-3 text-caption1-semibold text-brand-normal-default"
          )}
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default page;
