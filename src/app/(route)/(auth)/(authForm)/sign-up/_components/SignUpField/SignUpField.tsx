"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constant/SIGNUP_INPUT_CONFIG";
// import SignUpItem from "../SignUpItem/SignUpItem";
// import useAppMutation from "@/api/query/useAppMutation";
import { Button, InputText, DetailHeader, Toast } from "@/components";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const { addToast } = useToast();

  const HandlerToClick = (name: string) => {
    if (name === "email") {
      // TODO(수현): email 중복 확인 및 인증번호 발송 api
      // mutate({ email: name });
      addToast("인증번호가 발송되었습니다.", "success");
      addToast("이미 존재하는 이메일입니다.", "warning");
      addToast("다시 시도해 주세요.", "error");
    } else if (name === "emailAuth") {
      // TODO(수현): email 인증번호 확인 api
      addToast("인증되었습니다.", "success");
      addToast("인증번호가 일치하지 않습니다.", "warning");
      addToast("다시 시도해 주세요.", "error");
    } else if (name === "nickname") {
      // TODO(수현): 닉네임 중복 확인 api
      addToast("사용할 수 있는 닉네임입니다.", "success");
      addToast("중복된 닉네임입니다.", "warning");
      addToast("닉네임에 금칙어가 포함되어 있습니다.", "warning");
      addToast("다시 시도해 주세요.", "error");
    }
  };

  const isNextDisabled = isValid;

  return (
    <>
      <DetailHeader title="회원가입" />
      <div className="flex w-full flex-col gap-5 p-4">
        {SIGNUP_INPUT_CONFIG.map((item) => (
          <div key={item.name} className="h-[96px]">
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
          disabled={!isNextDisabled}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default SignUpField;
