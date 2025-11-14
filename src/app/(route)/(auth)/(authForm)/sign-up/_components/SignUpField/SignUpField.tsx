"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constant/SIGNUP_INPUT_CONFIG";
import { Button } from "@/components";
import SignUpItem from "../SignUpItem/SignUpItem";
import { useEffect, useState, useMemo } from "react";
import { FieldName, useFormContext, useWatch } from "react-hook-form";

type OneFormValues = {
  email: string;
  emailAuth: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

const fieldNames = ["email", "emailAuth", "password", "passwordConfirm", "nickname"];

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const [isFormValid, setIsFormValid] = useState(false); // 다음 버튼을 누르기 위한 disabled 장치

  // rhf hook호출
  const {
    control,
    getFieldState,
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const isPassword = getFieldState("password").invalid; // 비밀번호 유효성 검사 확인 (통과하면 false)
  const isPasswordConfirm = getFieldState("passwordConfirm").invalid; // 비밀번호 재확인 유효성 검사 확인 (통과하면 false)

  // useEffect(() => {
  //   console.log("isPassword>> ", isPassword);
  // }, [isPassword])

  return (
    <>
      <div className="flex w-full flex-col gap-5 p-4">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <SignUpItem key={item.name} item={item} />
        ))}
      </div>
      <div className="sticky bottom-0 mt-auto h-[88px] w-full max-w-[390px] border-t border-flatGray-50 bg-white px-4 py-3">
        <Button
          type="button"
          ariaLabel="회원가입 폼 버튼"
          onClick={onNext}
          className="w-full"
          disabled={!isFormValid}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
