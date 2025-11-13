import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormValue } from "../../types/FormValue";

type Step = "form" | "term" | "termDetail";

export const useSignUpFlow = () => {
  const router = useRouter();

  const [step, setStep] = useState<Step>("form");
  const [termDetail, setTermDetail] = useState("");

  const { handleSubmit, trigger } = useFormContext<FormValue>();

  // 최종 폼 제출
  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
    router.push("/email-login");
  });

  // 회원가입 1단계 -> 2단계
  const onNext = useCallback(async () => {
    const ok = await trigger(["email", "password", "passwordConfirm", "nickname"]);
    if (ok) {
      setStep("term");
    }
  }, [trigger]);

  // 약관 상세 열기
  const openTermDetail = useCallback((termKey: string) => {
    setStep("termDetail");
    setTermDetail(termKey);
  }, []);

  // 세부 약관 -> 약관 동의
  const onAgreeTerm = useCallback(() => {
    setStep("term");
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
    setStep,
    setTermDetail,
  };
};
