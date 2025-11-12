"use client";
"use no memo";

import { AllAgree, DetailAgree, SignUpField } from "./_components";
import { useSignUpFlow } from "./_hooks/useSignUpFlow";
import { FormProvider, useForm } from "react-hook-form";
import { FormValue } from "../types/FormValue";

const Page = () => {
  const methods = useForm<FormValue>({
    mode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  const {
    step,
    termDetail,
    onSubmit,
    onNext,
    openTermDetail,
    onAgreeTerm,
    completeTerms,
    setStep,
  } = useSignUpFlow();

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex w-full flex-1 flex-col justify-between">
          {step === "form" && <SignUpField onNext={onNext} />}
          {step === "term" && (
            <AllAgree onOpenDetail={openTermDetail} onComplete={() => completeTerms} />
          )}
          {step === "termDetail" && <DetailAgree termKey={termDetail} onAgree={onAgreeTerm} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
