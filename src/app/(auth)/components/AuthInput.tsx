import React from "react";
import { cn } from "@/utils/cn";
import { RegisterOptions } from "react-hook-form";

const InputStyle = "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]";

type FormValue = {
  email: string,
  password: string,
  passwordConfirm: string,
  nickname: string,
}

interface InputType {
  id: keyof FormValue,
  label?: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  required?: boolean;
};

const AuthInput: React.FC<InputType> = ({
  id,
  label,
  type = "text",
  placeholder = "",
  required = true,
  validation = "",
}) => {
  return (
    <>
      {
        label && <label htmlFor={id}>
          {label}
        </label>
      }
      <input
        className={InputStyle}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </>
  )
}

export default AuthInput;
