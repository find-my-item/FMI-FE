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

  const { isDisabled, isBtnDisabled, handlerToClick } = useSignUpBtnClick();

  return (
    <>
      <DetailHeader title="회원가입" />
      <div className="flex w-full flex-col gap-5 px-4 py-5">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <SignUpItem
            key={item.name}
            disabled={item.name === "emailAuth" && isDisabled}
            btnDisabled={item.name === "emailAuth" && isBtnDisabled}
            btnOnClick={() => handlerToClick(item.name)}
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

// {SIGNUP_INPUT_CONFIG.map((item) => (
//   <div key={item.name} className="h-[96px]">
//     <InputText
//       key={item.name}
//       name={item.name}
//       validation={inputValidation(item.name)}
//       label={item.label}
//       type={item.type}
//       placeholder={item.placeholder}
//       rule={item.rule}
//       eyeShow={item.eyeShow}
//       // disabled={item.name === "emailAuth" ? emailCodeVerified : false}
//       disabled={isEnabled}
//       btnOnClick={() => handlerToClick(item.name)}
//       maxLength={item.maxLength}
//     >
//       {item.btnText}
//     </InputText>
//   </div>
// ))}
