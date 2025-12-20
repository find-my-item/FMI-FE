"use no memo";

import { InputText } from "@/components";
import { InputTextProps } from "@/components/common/Input/InputText/InputText";
import { useFormContext, useController } from "react-hook-form";

const SignUpItem = ({ children, ...props }: InputTextProps) => {
  const { getValues, control } = useFormContext();

  const {
    field,
    fieldState: { error, isDirty },
  } = useController({
    name: props.name,
    control,
    rules: props.validation,
  });

  const isSuccess = isDirty && !error && field.value;

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
    <div className="h-[96px]">
      <InputText validation={inputValidation(props.name)} isSuccess={isSuccess} {...props}>
        {children}
      </InputText>
    </div>
  );
};

export default SignUpItem;
