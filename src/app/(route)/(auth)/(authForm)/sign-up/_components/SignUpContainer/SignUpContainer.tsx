"use client";

import { ApiSignUpType } from "../../../types/ApiSingUpType";
import { useSignUpFlow } from "../../_hooks/useSignUpFlow";
import SignUpField from "../SignUpField/SignUpField";
import AllAgree from "../AllAgree/AllAgree";
import DetailAgree from "../DetailAgree/DetailAgree";
import { SignUpResponse, useApiSignUp } from "../../_hooks/useApiSignUp";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const SignUpContainer = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate: SignUpMutate } = useApiSignUp();

  const handlerError = (error: SignUpResponse) => {
    if (error.code === "AUTH409-EMAIL_DUPLICATED") {
      addToast("이미 가입된 이메일이에요.", "warning");
    } else if (error.code === "AUTH409-EMAIL_RECENTLY_DELETED") {
      addToast("최근 탈퇴한 이메일이에요. 7일 후 재가입 해주세요.", "warning");
    } else {
      addToast("회원가입에 실패했어요. 다시 시도해 주세요.", "warning");
    }
  };

  const onSignUpSubmit = (data: ApiSignUpType) => {
    SignUpMutate(data, {
      onSuccess: () => {
        router.push("/email-login");
        addToast("회원가입이 완료되었어요.", "success");
      },
      onError: handlerError,
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
