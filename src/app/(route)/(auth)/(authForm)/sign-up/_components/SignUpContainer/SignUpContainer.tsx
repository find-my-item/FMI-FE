"use client";

import { FormType } from "../../../types/FormType";
// import { ApiSignUpType } from "../../../types/ApiSingUpType";
import { useSignUpFlow } from "../../_hooks/useSignUpFlow";
import SignUpField from "../SignUpField/SignUpField";
import AllAgree from "../AllAgree/AllAgree";
import DetailAgree from "../DetailAgree/DetailAgree";
import { useFormContext } from "react-hook-form";

interface SignUpContainerProps {
  onFinalSubmit: (data: FormType) => void;
}

const SignUpContainer = () => {
  const { handleSubmit } = useFormContext();
  const { step, onSubmit, onNext, openTermDetail, onAgreeTerm, completeTerms, termName } =
    useSignUpFlow();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-1 flex-col justify-between">
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
