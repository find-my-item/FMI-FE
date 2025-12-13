"use client";

import { useSignUpFlow } from "../../_hooks/useSignUpFlow";
import SignUpField from "../SignUpField/SignUpField";
import AllAgree from "../AllAgree/AllAgree";
import DetailAgree from "../DetailAgree/DetailAgree";
import { useSignUpSubmit } from "../../_hooks/useSignUpSubmit";

const SignUpContainer = () => {
  const { submitSignUp } = useSignUpSubmit();

  const { step, onNext, openTermDetail, onAgreeTerm, completeTerms, termName } = useSignUpFlow({
    onSubmit: submitSignUp,
  });

  return (
    <form className="flex w-full flex-1 flex-col justify-between">
      {step === "1" && <SignUpField onNext={() => onNext(2)} />}
      {step === "2" && !termName && (
        <AllAgree onOpenDetail={openTermDetail} onComplete={completeTerms} />
      )}
      {step === "2" && termName && (
        <DetailAgree termName={termName} onAgree={() => onAgreeTerm(2)} />
      )}
    </form>
  );
};

export default SignUpContainer;
