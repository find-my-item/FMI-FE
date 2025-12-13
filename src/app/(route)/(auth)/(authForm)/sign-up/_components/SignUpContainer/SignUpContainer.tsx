"use client";

import { ApiSignUpType } from "../../../types/ApiSingUpType";
import { useSignUpFlow } from "../../_hooks/useSignUpFlow";
import SignUpField from "../SignUpField/SignUpField";
import AllAgree from "../AllAgree/AllAgree";
import DetailAgree from "../DetailAgree/DetailAgree";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { SIGNUP_ERROR_MESSAGE } from "../../_constants/SIGNUP_ERROR_MESSAGE";
import { useApiSignUp } from "@/app/api";
import { ApiBaseResponseType } from "@/types";

const SignUpContainer = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate: SignUpMutate } = useApiSignUp();

  const handlerSignUpError = (error: ApiBaseResponseType<null>) => {
    const target = SIGNUP_ERROR_MESSAGE[error.code as keyof typeof SIGNUP_ERROR_MESSAGE];

    if (target) {
      addToast(target.message, target.status);
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
      onError: () => handlerSignUpError,
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
