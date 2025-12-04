"use client";

import { ApiSignUpType } from "../../../types/ApiSingUpType";
import { useSignUpFlow } from "../../_hooks/useSignUpFlow";
import SignUpField from "../SignUpField/SignUpField";
import AllAgree from "../AllAgree/AllAgree";
import DetailAgree from "../DetailAgree/DetailAgree";
import { useApiSignUp } from "../../_hooks/useApiSignUp";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const SignUpContainer = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate: SignUpMutate } = useApiSignUp();

  const onSignUpSubmit = (data: ApiSignUpType) => {
    console.log("request>>> ", data);
    SignUpMutate(data, {
      onSuccess: (res) => {
        console.log("res>>> ", res);
        router.push("/email-login");
        addToast("회원가입이 완료되었어요.", "success");
      },
      onError: (error) => {
        console.log("error>>>", error);
        addToast("회원가입에 실패했어요", "warning");
      },
    });
  };

  const { step, onNext, openTermDetail, onAgreeTerm, completeTerms, termName } = useSignUpFlow({
    onSubmit: onSignUpSubmit,
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
