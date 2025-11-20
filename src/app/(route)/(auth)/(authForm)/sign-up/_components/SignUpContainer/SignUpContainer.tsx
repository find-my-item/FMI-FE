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
  const { step, onSubmit, onNext, openTermDetail, onAgreeTerm, completeTerms } =
    useSignUpFlow(onFinalSubmit);

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-1 flex-col justify-between">
      {step === "1" && <SignUpField onNext={() => onNext(2)} />}
      {step === "2" && <AllAgree onOpenDetail={openTermDetail} onComplete={completeTerms} />}
      {step === "3" && <DetailAgree onAgree={() => onAgreeTerm(2)} />}
    </form>
  );
};

export default SignUpContainer;
