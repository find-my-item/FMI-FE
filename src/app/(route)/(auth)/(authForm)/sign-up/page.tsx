"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import AllAgree from "./_components/AllAgree";
import SignUpField from "./_components/SignUpField";
import DetailAgree from "./_components/DetailAgree";
import { useRouter } from "next/navigation";

type Step = "form" | "term" | "termDetail";

const Page = () => {
  const router = useRouter();

  const [step, setStep] = useState<Step>("term");
  const [termDetail, setTermDetail] = useState("");

  const { handleSubmit, trigger } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
    router.push("/");
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
    console.log("ok>>> ", ok);
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
          <AllAgree onOpenDetail={openTermDetail} onComplete={() => completeTerms} />
        )}
        {step === "termDetail" && (
          <DetailAgree termKey={termDetail} onBack={() => setStep("term")} onAgree={onAgreeTerm} />
        )}
      </form>
    </div>
  );
};

export default Page;
