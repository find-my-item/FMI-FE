"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constants/SIGNUP_INPUT_CONFIG";
import { Button, InputText, DetailHeader } from "@/components";
import { useFormContext } from "react-hook-form";
import { useSignUpBtnClick } from "../../_hooks/useSignUpBtnClick";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const {
    formState: { isValid },
  } = useFormContext();

  const { handlerToClick, emailCodeVerified } = useSignUpBtnClick();

  const isNextDisabled = isValid;

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
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              validation={item.validation}
              rule={item.rule}
              eyeShow={item.eyeShow}
              disabled={item.name === "emailAuth" ? emailCodeVerified : false}
              btnOnClick={() => handlerToClick(item.name)}
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
