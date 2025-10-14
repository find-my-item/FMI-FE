"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import AllAgree from "./_components/AllAgree";
import SignUpField from "./_components/SignUpField";

type Step = "form" | "term"; // 회원가입 단계 타입 정의

const Page = () => {
  const [step, setStep] = useState<Step>("term"); // 회원가입
  const { handleSubmit, trigger } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  // 다음 스탭 버튼 함수
  const onNext = async () => {
    const ok = await trigger(["email", "password", "passwordConfirm", "nickname"]);
    if (ok) setStep("term");
  };

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <form onSubmit={onSubmit} className="flex w-full flex-1 flex-col justify-between">
        {step === "form" && <SignUpField onNext={onNext} />}
        {step === "term" && <AllAgree />}
      </form>
    </div>
  );
};

export default Page;
