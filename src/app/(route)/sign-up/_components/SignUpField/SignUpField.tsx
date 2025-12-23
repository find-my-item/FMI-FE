"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constants/SIGNUP_INPUT_CONFIG";
import { Button, DetailHeader } from "@/components";
import { useFormContext } from "react-hook-form";
import { useSignUpBtnClick } from "../../_hooks/useSignUpBtnClick";
import { useEffect } from "react";
import SignUpItem from "../SignUpItem/SignUpItem";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const {
    watch,
    trigger,
    formState: { isValid },
  } = useFormContext();

  const isNextEnabled = isValid;

  const password = watch("password");

  useEffect(() => {
    void trigger("passwordConfirm");
  }, [password, trigger]);

  const { isEmailDisabled, isEmailAuthDisabled, isEmailAuthVerified, handlerToClick } =
    useSignUpBtnClick();

  const handleDisabled = (name: string) => {
    if (name === "emailAuth") return isEmailAuthDisabled;
    else if (name === "email") return isEmailDisabled;
  };

  const handleSuccess = (name: string) => {
    if (name === "emailAuth") return isEmailAuthVerified;
    // else if (name === "nickname") return isNicknameDisabled;
    else return false;
  };

  return (
    <>
      <DetailHeader title="회원가입" />
      <div className="flex w-full flex-col gap-5 px-4 py-5">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <SignUpItem
            key={item.name}
            disabled={handleDisabled(item.name)}
            btnOnClick={() => handlerToClick(item.name)}
            isVerified={handleSuccess(item.name)}
            {...item}
          />
        ))}
      </div>
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-flatGray-50 bg-white px-4 py-3">
        <Button
          type="button"
          ariaLabel="회원가입 폼 버튼"
          onClick={onNext}
          className="w-full"
          disabled={!isNextEnabled}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
