"use no memo";

import { SIGNUP_INPUT_CONFIG } from "../../_constant/SIGNUP_INPUT_CONFIG";
import { Button, InputText, DetailHeader } from "@/components";
import { useFormContext } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";
import { useCheckCode, useSendEmail, useCheckNickname } from "@/app/api";

const SignUpField = ({ onNext }: { onNext: () => void }) => {
  const {
    getValues,
    formState: { isValid },
  } = useFormContext();

  const { mutate: EmailMutate } = useSendEmail();
  const [emailValue, setEmailValue] = useState("");

  const { mutate: CodeMutate } = useCheckCode();
  const { addToast } = useToast();

  const [codeVerified, setCodeVerified] = useState(false);

  // 닉네임 검사
  const [nicknameValue, setNicknameValue] = useState("");
  const { data, error, isSuccess, isError } = useCheckNickname(nicknameValue);

  const handlerNickname = () => {
    if (!data) return;
    if (isSuccess && data.code === "COMMON200") {
      addToast("사용할 수 있는 닉네임입니다.", "success");
    } else if (isError && data.code === "NICKNAME_INVALID") {
      addToast("닉네임에 금칙어가 포함되어 있습니다.", "warning");
    } else if (isError && data.code === "NICKNAME_DUPLICATE") {
      addToast("중복된 닉네임입니다.", "warning");
    }
  };

  // 닉네임 api useEffect
  useEffect(() => {
    handlerNickname();
  }, [nicknameValue, data, error, isSuccess, isError]);

  const handlerErrorEmail = (error: SendEmailResponseType) => {
    if (error.code === "_EMAIL_DUPLICATED") {
      addToast("이미 존재하는 이메일이에요.", "warning");
    } else if (error.code === "_EMAIL_RECENTLY_DELETED") {
      addToast("최근 탈퇴한 이메일이에요. 7일 후 재가입 해주세요.", "warning");
    } else {
      addToast("다시 시도해 주세요.", "error");
    }
  };

  const handlerErrorCode = (error: CheckCodeResponseType) => {
    console.log("error>> ", error);
    if (error.code === "_INVALID_CREDENTIALS") {
      addToast("인증번호가 일치하지 않아요", "warning");
    } else {
      addToast("다시 시도해 주세요.", "error");
    }
  };

  // 버튼 클릭 함수
  const HandlerToClick = (name: string) => {
    if (name === "email") {
      const isEmail = getValues(name);
      setEmailValue(isEmail);
      EmailMutate(
        { email: isEmail },
        {
          onSuccess: () => addToast("인증번호가 발송되었습니다.", "success"),
          onError: handlerErrorEmail,
        }
      );
    } else if (name === "emailAuth") {
      const codeValue = getValues(name);
      CodeMutate(
        { email: emailValue, code: codeValue },
        {
          onSuccess: () => {
            setCodeVerified(true);
            addToast("인증되었습니다.", "success");
          },
          onError: handlerErrorCode,
        }
      );
    } else if (name === "nickname") {
      const nickname = getValues(name);
      if (nickname) {
        setNicknameValue(nickname);
      } else {
        addToast("닉네임을 입력해 주세요.", "warning");
      }
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
              key={item.name}
              name={item.name}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              validation={item.validation}
              rule={item.rule}
              eyeShow={item.eyeShow}
              disabled={item.name === "emailAuth" ? codeVerified : false}
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
