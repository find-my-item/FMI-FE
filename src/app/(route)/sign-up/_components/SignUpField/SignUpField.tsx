"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constants/SIGNUP_INPUT_CONFIG";
import { Button, DetailHeader } from "@/components";
import { useFormContext, useWatch } from "react-hook-form";
import { useSignUpBtnClick } from "../../_hooks/useSignUpBtnClick";
import { useEffect } from "react";
import SignUpItem from "../SignUpItem/SignUpItem";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const {
    control,
    trigger,
    formState: { isValid },
  } = useFormContext();

  const password = useWatch({ control, name: "password" });

  useEffect(() => {
    void trigger("passwordConfirm");
  }, [password, trigger]);

  const {
    isEmailDisabled,
    isEmailAuthDisabled,
    isEmailAuthVerified,
    handlerToClick,
    isNicknameVerified,
  } = useSignUpBtnClick();

  const handleDisabled = (name: string) => {
    if (name === "emailAuth") return isEmailAuthDisabled;
    else if (name === "email") return isEmailDisabled;
  };

  const handleVerified = (name: string) => {
    if (name === "emailAuth") return isEmailAuthVerified;
    else if (name === "nickname") return isNicknameVerified;
    else return false;
  };

  const isNextEnabled = isValid && isEmailAuthVerified && isNicknameVerified;
  console.log("nickname>>> ", isNicknameVerified);
  return (
    <>
      <DetailHeader title="회원가입" />
      <div className="flex w-full flex-col gap-5 px-4 py-5">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <SignUpItem
            key={item.name}
            disabled={handleDisabled(item.name)}
            btnOnClick={() => handlerToClick(item.name)}
            isVerified={handleVerified(item.name)}
            {...item}
          />
        ))}
      </div>
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-divider-default bg-white px-4 py-3">
        <Button
          type="button"
          variant="auth"
          ariaLabel="회원가입 폼 버튼"
          onClick={onNext}
          disabled={!isNextEnabled}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
