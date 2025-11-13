"use client";
"use no memo";

import { AllAgree, DetailAgree, SignUpField } from "./_components";
import { useSignUpFlow } from "./_hooks/useSignUpFlow";

const Page = () => {
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
      <form onSubmit={onSubmit} className="flex w-full flex-1 flex-col justify-between">
        {step === "form" && <SignUpField onNext={onNext} />}
        {step === "term" && (
          <AllAgree onOpenDetail={openTermDetail} onComplete={() => completeTerms} />
        )}
        {step === "termDetail" && <DetailAgree termKey={termDetail} onAgree={onAgreeTerm} />}
      </form>
    </div>
  );
};

export default Page;
