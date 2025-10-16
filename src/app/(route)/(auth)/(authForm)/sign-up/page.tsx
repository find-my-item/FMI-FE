"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import AllAgree from "./_components/AllAgree";
import SignUpField from "./_components/SignUpField";
import DetailAgree from "./_components/DetailAgree";

type Step = "form" | "term" | "termDetail"; // 회원가입 단계 타입 정의

const Page = () => {
  const [step, setStep] = useState<Step>("form"); // 회원가입 컴포넌트 상태관리
  const [termDetail, setTermDetail] = useState(""); // 상세약관 상태관리

  const { handleSubmit, trigger } = useFormContext(); // 폼관리

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  const onNext = async () => {
    const ok = await trigger(["email", "password", "passwordConfirm", "nickname"]);
    if (ok) setStep("term");
  };

  const openTermDetail = (termKey: string) => {
    setStep("termDetail");
    setTermDetail(termKey);
  };

  const completeTerms = async () => {
    const ok = await trigger(["termsOfService", "privacyPolicy"]);
    if (ok) {
      onSubmit();
    }
  };

  const onAgreeTerm = () => {
    setStep("term");
  };

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <form onSubmit={onSubmit} className="flex w-full flex-1 flex-col justify-between">
        {step === "form" && <SignUpField onNext={onNext} />}
        {step === "term" && (
          <AllAgree
            onOpenDetail={openTermDetail}
            onBack={() => setStep("form")}
            onComplete={() => completeTerms}
          />
        )}
        {step === "termDetail" && (
          <DetailAgree termKey={termDetail} onBack={() => setStep("term")} onAgree={onAgreeTerm} />
        )}
      </form>
    </div>
  );
};

export default Page;
