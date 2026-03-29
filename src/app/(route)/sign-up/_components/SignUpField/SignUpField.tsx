"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constants/SIGNUP_INPUT_CONFIG";
import { DetailHeader } from "@/components/layout";
import { useFormContext, useWatch } from "react-hook-form";
import { useSignUpBtnClick } from "../../_hooks/useSignUpBtnClick";
import { useEffect } from "react";
import SignUpItem from "../SignUpItem/SignUpItem";
import { FooterButton } from "@/components/domain";

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
    isNicknameDisabled,
    EmailPending,
    EmailCodePending,
    timer,
  } = useSignUpBtnClick();

  const handleDisabled = (name: string) => {
    if (name === "emailAuth") return isEmailAuthDisabled;
    else if (name === "email") return isEmailDisabled;
    else if (name === "nickname") return isNicknameDisabled;
  };

  const handleVerified = (name: string) => {
    if (name === "emailAuth") return isEmailAuthVerified;
    else if (name === "nickname") return isNicknameVerified;
    else return false;
  };

  const handleBtnDisabled = (name: string) => {
    if (name === "emailAuth") return EmailCodePending;
    else if (name === "email") return EmailPending || timer > 0;
  };

  const handleTimer = (name: string) => {
    if (name === "emailAuth" && timer > 0) return timer;
  };

  const isNextEnabled = isValid && isEmailAuthVerified && isNicknameVerified;

  return (
    <>
      <DetailHeader title="회원가입" />
      <div className="flex w-full flex-1 flex-col gap-5 px-4 py-5 h-base tablet:px-[80px]">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <SignUpItem
            key={item.inputOption.name}
            {...item}
            isVerified={handleVerified(item.inputOption.name)}
            inputOption={{
              disabled: handleDisabled(item.inputOption.name),
              autoFocus: item.inputOption.name === "email",
              ...item.inputOption,
            }}
            btnOption={{
              ...item.btnOption,
              btnOnClick: () => handlerToClick(item.inputOption.name),
              disabled: handleBtnDisabled(item.inputOption.name),
            }}
            caption={{
              ...item.caption,
              timer: handleTimer(item.inputOption.name),
            }}
          />
        ))}
      </div>

      <FooterButton aria-label="다음 버튼" onClick={onNext} disabled={!isNextEnabled}>
        다음
      </FooterButton>
    </>
  );
};

export default SignUpField;
