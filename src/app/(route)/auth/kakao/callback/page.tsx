"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApiKakaoLogin } from "@/api/fetch/auth";
import { Icon } from "@/components/common";
import { useToast } from "@/context/ToastContext";

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const isRequesting = useRef(false);

  const { mutate: KakaoLoginMutate } = useApiKakaoLogin();

  const { addToast } = useToast();

  useEffect(() => {
    if (!code) return;
    if (isRequesting.current) return;

    isRequesting.current = true;

    KakaoLoginMutate(
      {
        code: code,
        environment: "dev",
      },
      {
        onSuccess: () => {
          router.replace("/");
        },
        onError: (error) => {
          isRequesting.current = false;
          if (error.code === "AUTH400-KAKAO_CODE_INVALID")
            addToast("카카오 인증코드가 유효하지 않거나 이미 사용되었어요.", "warning");
          if (error.code === "AUTH500-KAKAO_USERINFO_FAILED")
            addToast("카카오 사용자 정보 조회에 실패했어요.", "warning");
          else addToast("로그인에 실패했어요. 다시 시도해주세요.", "warning");
          router.replace("/login");
        },
      }
    );
  }, [code, KakaoLoginMutate, router]);

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <div className="flex flex-col items-center gap-4">
        <Icon name="Loading" className="animate-spin" size={30} />
        <p className="text-body1-bold text-gray-700">카카오 로그인 중입니다...</p>
        <p className="text-caption1-medium text-gray-500">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default KakaoCallbackPage;
