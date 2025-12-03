import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { FormType } from "../../types/FormType";

export const useSignUpFlow = () => {
  // export const useSignUpFlow = (onFinalSubmit: (data: FormType) => void) => {
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

  const { handleSubmit, trigger, getValues } = useFormContext<FormType>();
  // const onSubmit = handleSubmit(onFinalSubmit);
  const onSubmit = (data: any) => {
    console.log("request>>> ", data);
  };

  // 가드
  useEffect(() => {
    const isStep = step === "1" || step === "2";
    if (!isStep) {
      router.replace(`/sign-up?step=1`);
    }
    if (Number(step) > maxStep) {
      router.replace(`/sign-up?step=${maxStep}`);
    }
  }, [step, maxStep, router]);

  // 회원가입 1단계 -> 2단계
  const onNext = useCallback(
    async (nextStep: number) => {
      const ok = await trigger(["email", "password", "nickname"]);
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
    const ok = await trigger(["termsOfServiceAgreed", "privacyPolicyAgreed", "marketingConsent"]);
    if (ok) {
      const data = getValues();
      const selectedData = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        termsOfServiceAgreed: data.termsOfServiceAgreed,
        privacyPolicyAgreed: data.privacyPolicyAgreed,
        marketingConsent: data.marketingConsent,
      };
      onSubmit(selectedData);
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
