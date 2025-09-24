import { InputType } from "@/app/types/InputTypes";
import { InputStyle } from "../styles/authStyle";

export type FormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export const signUpInputObject: InputType[] = [
  {
    id: "email",
    label: "이메일",
    type: "email",
    style: InputStyle,
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
    id: "password",
    label: "비밀번호",
    type: "password",
    style: InputStyle,
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
    id: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    style: InputStyle,
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
    id: "nickname",
    label: "닉네임",
    type: "text",
    style: InputStyle,
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
