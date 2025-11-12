"use client";

import { FormValue } from "../../../types/FormValue";
import { useSignUpFlow } from "../../_hooks/useSignUpFlow";
import SignUpField from "../SignUpField/SignUpField";
import AllAgree from "../AllAgree/AllAgree";
import DetailAgree from "../DetailAgree/DetailAgree";

interface SignUpContainerProps {
  onFinalSubmit: (data: FormValue) => void | Promise<void>;
}

const SignUpContainer = ({ onFinalSubmit }: SignUpContainerProps) => {
  const { step, termDetail, onSubmit, onNext, openTermDetail, onAgreeTerm, completeTerms } =
    useSignUpFlow(onFinalSubmit);

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-1 flex-col justify-between">
      {step === "form" && <SignUpField onNext={onNext} />}
      {step === "term" && <AllAgree onOpenDetail={openTermDetail} onComplete={completeTerms} />}
      {step === "termDetail" && <DetailAgree termKey={termDetail} onAgree={onAgreeTerm} />}
    </form>
  );
};

export default SignUpContainer;
