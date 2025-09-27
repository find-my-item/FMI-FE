import { InputType } from "@/app/types/InputTypes";

export type FormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export const signUpInputObject: InputType[] = [
  {
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력해주세요",
    validation: {
      required: "이메일은 필수 항목 입니다",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "이메일을 입력해주세요",
      },
    },
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해주세요 (8~16자, 영문, 숫자, 특수문자 포함)",
    validation: {
      required: true,
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/,
        message: "비밀번호을 입력해주세요 (8~16자, 영문, 숫자, 특수문자 포함)",
      },
    },
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호 재입력",
    validation: {
      required: true,
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/,
        message: "비밀번호 재입력",
      },
    },
  },
  {
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해주세요.",
    validation: {
      required: "닉네임을 입력해주세요.",
      maxLength: {
        value: 10,
        message: "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로)",
      },
    },
  },
];
