"use no memo";

import { InputText } from "@/components/common";
import { InputTextProps } from "@/components/common/Input/InputText/InputText";
import { useFormContext, useController, RegisterOptions } from "react-hook-form";
import { FormType } from "../../types/FormType";

const inputValidationRules: Partial<Record<keyof FormType, RegisterOptions<FormType, any>>> = {
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
    pattern: {
      value: /^[a-zA-Z0-9가-힣]+$/,
      message: "자음·모음 및 특수문자는 입력할 수 없습니다.",
    },
    minLength: {
      value: 2,
      message: "2~10자 사이의 닉네임을 입력해 주세요.",
    },
    maxLength: {
      value: 10,
      message: "2~10자 사이의 닉네임을 입력해 주세요.",
    },
  },
};

interface SignUpItemProps extends InputTextProps {
  isVerified: boolean;
  disabled?: boolean;
}

const SignUpItem = ({ isVerified, disabled, ...props }: SignUpItemProps) => {
  const { control } = useFormContext<FormType>();

  const { inputOption, label, btnOption, caption } = props;
  const name = inputOption.name as keyof FormType;

  const {
    field,
    fieldState: { error, isDirty },
  } = useController({
    name: name,
    control,
    rules: inputValidationRules[name] as RegisterOptions<FormType, any>,
  });

  const isFieldSuccess = isDirty && !error && !!field.value;

  const isSuccessState = name === "emailAuth" || name === "nickname" ? isVerified : isFieldSuccess;

  return (
    <div className="h-[96px]">
      <InputText
        inputOption={{
          ...inputOption,
          disabled: disabled,
          validation: inputValidationRules[name] as any,
        }}
        label={label}
        btnOption={btnOption}
        caption={{
          ...caption,
          isSuccess: isSuccessState,
        }}
      />
    </div>
  );
};

export default SignUpItem;
