"use no memo";

import { InputText } from "@/components";
import { InputTextProps } from "@/components/common/Input/InputText/InputText";
import { useFormContext, useController } from "react-hook-form";
import { FormType } from "../../types/FormType";

const inputValidationRules = {
  email: {
    required: true,
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "이메일 형식을 입력해 주세요." },
  },
  emailAuth: {
    required: true,
  },
  password: {
    required: true,
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/,
      message: "대문자/소문자/숫자/특수 문자 포함 8자리 이상을 입력해 주세요.",
    },
  },
  passwordConfirm: {
    required: true,
    validate: (value: string, formValues: FormType) =>
      value === formValues.password || "비밀번호가 일치하지 않습니다.",
    deps: ["password"],
  },
  nickname: {
    required: true,
    maxLength: {
      value: 10,
      message: "2~10자 사이의 닉네임을 입력해 주세요.",
    },
  },
};

interface SignUpItemProps extends InputTextProps {
  isVerified: boolean;
}

const SignUpItem = ({ children, isVerified, ...props }: SignUpItemProps) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error, isDirty },
  } = useController({
    name: props.name,
    control,
    rules: props.validation,
  });

  const isSuccess = isDirty && !error && field.value;

  const handleSuccess = (name: string) => {
    if (name === "emailAuth") return isVerified;
    else return isSuccess;
  };

  const inputValidation = (name: string) =>
    inputValidationRules[name as keyof typeof inputValidationRules];

  return (
    <div className="h-[96px]">
      <InputText
        validation={inputValidation(props.name)}
        isSuccess={handleSuccess(props.name)}
        {...props}
      >
        {children}
      </InputText>
    </div>
  );
};

export default SignUpItem;
