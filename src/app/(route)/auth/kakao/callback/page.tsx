"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApiKakaoLogin } from "@/api/fetch/auth";
import { Icon } from "@/components/common";

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const isRequesting = useRef(false);

  const { mutate: KakaoLoginMutate } = useApiKakaoLogin();

  useEffect(() => {
    if (!code) return;

    if (isRequesting.current) return;

    console.log("인가 코드 발견>> ", code);
    isRequesting.current = true;

    KakaoLoginMutate(
      { code: code },
      {
        onSuccess: (res) => {
          console.log("로그인 성공!", res);

          router.push("/");
        },
        onError: (error) => {
          console.error("로그인 실패", error);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
          isRequesting.current = false;
          router.push("/login");
        },
      }
    );
  }, [code, KakaoLoginMutate, router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Icon name="Loading" className="animate-spin" size={30} />
        <p className="text-body1-bold text-gray-700">카카오 로그인 중입니다...</p>
        <p className="text-caption1-medium text-gray-500">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default KakaoCallbackPage;
