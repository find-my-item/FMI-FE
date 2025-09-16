"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterOptions } from "react-hook-form";
import AuthInput from "../components/AuthInput";

type FormValue = {
  email: string,
  password: string,
  passwordConfirm: string,
  nickname: string,
}

interface InputType {
  id: keyof FormValue,
  label: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  required?: boolean;
};

export const singUpInputObject: InputType[] = [
  {
    id: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력해주세요",
    validation: {
      pattern: {
        value: /^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]{2,}$/,
        message: "이메일을 입력해주세요"
      }
    },
    required: true,
  },
  {
    id: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해주세요 (8~16자, 영문, 숫자, 특수문자 포함)",
    validation: {
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8, 16}$/,
        message: "비밀번호을 입력해주세요 (8~16자, 영문, 숫자, 특수문자 포함)",
      }
    },
    required: true,
  },
  {
    id: "passwordConfirm",
    label: "비밀번호 재입력",
    type: "password",
    placeholder: "비밀번호 재입력",
    validation: {
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8, 16}$/,
        message: "비밀번호 재입력",
      }
    }
    ,
    required: true,
  },
  {
    id: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해주세요",
    required: true,
  },
];

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          singUpInputObject.map((item) => (
            <AuthInput
              {...register("type", {})}
              id={item.id}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              required={item.required}
              validation={item.validation}
            />
          ))
        }
      </form>
    </div>
  )
}

export default Page;