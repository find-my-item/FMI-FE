"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constant/SIGNUP_INPUT_CONFIG";
import { Button, InputText } from "@/components";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const [isFormValid, setIsFormValid] = useState(false); // 다음 버튼을 누르기 위한 disabled 장치

  const {
    control,
    getFieldState,
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const isPassword = getFieldState("password").invalid; // 비밀번호 유효성 검사 확인 (통과하면 false)
  const isPasswordConfirm = getFieldState("passwordConfirm").invalid; // 비밀번호 재확인 유효성 검사 확인 (통과하면 false)

  const HandlerToClick = (name: string) => {
    if (name === "email") {
      // TODO(수현): email 중복 확인 및 인증번호 발송 api
    } else if (name === "emailAuth") {
      // TODO(수현): email 인증번호 확인 api
    } else if (name === "nickname") {
      // TODO(수현): 닉네임 중복 확인 api
    }
  };

  useEffect(() => {
    // TODO(수현): api 연결 후 나머지 변수 추가 -> 버튼 disabled 해제
    setIsFormValid(!isPassword && !isPasswordConfirm);
  }, [isPassword, isPasswordConfirm]);

  return (
    <>
      <div className="flex w-full flex-col gap-5 p-4">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <div className="h-[96px]">
            {/* TODO(수현): props 줄이기  */}
            <InputText
              name={item.name}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              validation={item.validation}
              rule={item.rule}
              eyeShow={item.eyeShow}
              btnOnClick={() => HandlerToClick(item.name)}
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
          disabled={!isFormValid}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
