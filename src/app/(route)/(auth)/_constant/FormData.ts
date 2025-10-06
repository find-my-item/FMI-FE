import { InputType } from "@/types/InputTypes";
import { InputStyle } from "../styles/authStyle";
import { cn } from "@/utils/cn";

export type FormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export const signUpInputObject: InputType[] = [
  {
    name: "email",
    label: "아이디(이메일)",
    type: "text",
    placeholder: "로그인에 사용할 이메일을 입력해주세요.",
    validation: {
      required: true,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "이미 가입된 이메일입니다.",
      },
    },
  },
  {
    name: "emailAuth",
    label: "이메일 인증",
    type: "text",
    placeholder: "인증번호를 입력해주세요.",
    className: cn(InputStyle, "w-[229px]"),
    validation: {
      required: false,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "이메일을 입력해주세요.",
      },
    },
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해 주세요.",
    rule: "8~16자리, 영문/숫자/특수 문자 포함",
    validation: {
      required: true,
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/,
        message: "영문/숫자/특수 문자 포함 8자리 이상을 입력해 주세요.",
      },
    },
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호 입력해 주세요.",
    validation: {
      required: true,
      validate: (value, formValue) => value === formValue || "비밀번호가 일치하지 않습니다.",
    },
  },
  {
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해 주세요.",
    rule: "2~10자, 특수문자/금칙어 제한",
    className: cn(InputStyle, "w-[256px]"),
    validation: {
      required: true,
      maxLength: {
        value: 10,
        message: "2~10자 사이의 닉네임을 입력해 주세요.",
      },
    },
  },
];
