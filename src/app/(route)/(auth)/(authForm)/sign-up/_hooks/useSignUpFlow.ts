import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValue } from "../../types/FormValue";
import { useRouter, useSearchParams } from "next/navigation";

export const useSignUpFlow = (onFinalSubmit: (data: FormValue) => void) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const step = searchParams.get("step") ?? "1";

  // const [step, setStep] = useState<Number>(1);
  const [termDetail, setTermDetail] = useState("");

  const { handleSubmit, trigger } = useFormContext<FormValue>();

  const onSubmit = handleSubmit(onFinalSubmit);

  // 회원가입 1단계 -> 2단계
  const onNext = useCallback(
    async (nextStep: number) => {
      const ok = await trigger(["email", "password", "passwordConfirm", "nickname"]);
      if (ok) {
        router.push(`/sign-up?step=${nextStep}`);
        // setStep(2);
      }
    },
    [trigger]
  );

  // 약관 상세 열기
  const openTermDetail = useCallback((termKey: string) => {
    router.push(`/sign-up?step=3`);
    // setStep(3);
    setTermDetail(termKey);
  }, []);

  // 세부 약관 -> 약관 동의
  const onAgreeTerm = useCallback(async (nextStep: number) => {
    router.push(`/sign-up?step=${nextStep}`);
    // setStep(2);
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
    termDetail,
    onSubmit,
    onNext,
    openTermDetail,
    onAgreeTerm,
    completeTerms,
    // setStep,
    setTermDetail,
  };
};
