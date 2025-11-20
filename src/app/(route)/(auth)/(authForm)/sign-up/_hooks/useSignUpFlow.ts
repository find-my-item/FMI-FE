import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValue } from "../../types/FormValue";
import { useRouter, useSearchParams } from "next/navigation";

export const useSignUpFlow = (onFinalSubmit: (data: FormValue) => void) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 컴포넌트 전환 변수
  const step = searchParams.get("step") ?? "1";
  const termName = searchParams.get("term") ?? "";

  // 가드 변수
  const [maxStep, setMaxStep] = useState<number>(1);

  // maxStep 변경 시 sessionStorage에 저장
  useEffect(() => {
    const stored = window.sessionStorage.getItem("signup-max-step");
    if (stored) {
      setMaxStep(Number(stored));
    }
  }, []);

  const { handleSubmit, trigger } = useFormContext<FormValue>();
  const onSubmit = handleSubmit(onFinalSubmit);

  // 가드
  useEffect(() => {
    if (Number(step) > maxStep) {
      router.replace(`/sign-up?step=${maxStep}`);
    }
  }, [step, maxStep, router]);

  // 회원가입 1단계 -> 2단계
  const onNext = useCallback(
    async (nextStep: number) => {
      const ok = await trigger(["email", "password", "passwordConfirm", "nickname"]);
      if (ok) {
        setMaxStep((prev) => (nextStep > prev ? nextStep : prev));
        router.push(`/sign-up?step=${nextStep}`);
      }
    },
    [trigger, router]
  );

  // 약관 상세 열기
  const openTermDetail = useCallback((termKey: string) => {
    router.push(`/sign-up?step=2&term=${termKey}`);
  }, []);

  // 세부 약관 -> 약관 동의
  const onAgreeTerm = useCallback(async (preStep: number) => {
    router.push(`/sign-up?step=${preStep}`);
  }, []);

  // 약관 동의 -> 최종제출
  const completeTerms = useCallback(async () => {
    const ok = await trigger([
      "agreements.termsOfService",
      "agreements.privacyPolicy",
      "agreements.marketing",
    ]);
    if (ok) {
      onSubmit();
    }
  }, [trigger, onSubmit]);

  return {
    step,
    onSubmit,
    onNext,
    openTermDetail,
    onAgreeTerm,
    completeTerms,
    termName,
  };
};
