"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constants/SIGNUP_INPUT_CONFIG";
import { Button, InputText, DetailHeader } from "@/components";
import { useFormContext } from "react-hook-form";
import { useSignUpBtnClick } from "../../_hooks/useSignUpBtnClick";
import { useEffect } from "react";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const {
    watch,
    getValues,
    trigger,
    formState: { isValid },
  } = useFormContext();

  const { handlerToClick, emailCodeVerified } = useSignUpBtnClick();

  const isNextEnabled = isValid;

  const password = watch("password");

  useEffect(() => {
    void trigger("passwordConfirm");
  }, [password, trigger]);

  const inputValidation = (name: string) => {
    if (name === "email")
      return {
        required: true,
      };
    else if (name === "emailAuth")
      return {
        required: true,
      };
    else if (name === "password")
      return {
        required: true,
        pattern: {
          value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/,
          message: "대문자/소문자/숫자/특수 문자 포함 8자리 이상을 입력해 주세요.",
        },
      };
    else if (name === "passwordConfirm")
      return {
        required: true,
        validate: (value: string) =>
          value === getValues("password") || "비밀번호가 일치하지 않습니다.",
        deps: ["password"],
      };
    else if (name === "nickname")
      return {
        required: true,
        maxLength: {
          value: 10,
          message: "2~10자 사이의 닉네임을 입력해 주세요.",
        },
      };
  };

  return (
    <>
      <DetailHeader title="회원가입" />
      <div className="flex w-full flex-col gap-5 p-4">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <div key={item.name} className="h-[96px]">
            {/* TODO(수현): props 줄이기  */}
            <InputText
              key={item.name}
              name={item.name}
              validation={inputValidation(item.name)}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              rule={item.rule}
              eyeShow={item.eyeShow}
              disabled={item.name === "emailAuth" ? emailCodeVerified : false}
              btnOnClick={() => handlerToClick(item.name)}
              maxLength={item.maxLength}
            >
              {item.btnText}
            </InputText>
          </div>
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
