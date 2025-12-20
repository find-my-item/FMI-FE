import { RegisterOptions } from "react-hook-form";

interface InputType {
  name: string;
  label?: string;
  className?: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  rule?: string; // 닉네임 규칙 안내 문구
  eyeShow?: boolean;
  children?: string;
  successMessage?: string;
  maxLength?: number;
}

// TODO(수현): validate 분리하기 (validate는 동적이기 때문에 따로 관리하는 것이 나을것 같음)
export const SIGNUP_INPUT_CONFIG = [
  {
    name: "email",
    label: "아이디(이메일)",
    type: "text",
    placeholder: "로그인에 사용할 이메일을 입력해주세요.",
    // validation: {
    //   required: true,
    // },
    children: "인증번호 발송",
    maxLength: 256,
  },
  {
    name: "emailAuth",
    label: "이메일 인증",
    type: "text",
    placeholder: "인증번호를 입력해주세요.",
    // validation: {
    //   required: true,
    // },
    children: "인증번호 확인",
    successMessage: "인증되었습니다.",
    maxLength: 6,
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해 주세요.",
    rule: "8~16자리, 대문자/소문자/숫자/특수 문자 포함",
    eyeShow: true,
    // validation: {
    //   required: true,
    //   pattern: {
    //     value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/,
    //     message: "대문자/소문자/숫자/특수 문자 포함 8자리 이상을 입력해 주세요.",
    //   },
    // },
    successMessage: "영문/숫자/특수 문자 포함 8자리 이상",
    maxLength: 16,
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호 입력해 주세요.",
    eyeShow: true,
    // validation: {
    //   required: true,
    //   validate: (value, formValue) =>
    //     value === formValue.password || "비밀번호가 일치하지 않습니다.",
    //   deps: ["password"],
    // },
    successMessage: "비밀번호가 일치합니다.",
    maxLength: 16,
  },
  {
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해 주세요.",
    rule: "2~10자, 특수문자/금칙어 제한",
    // validation: {
    //   required: true,
    //   maxLength: {
    //     value: 10,
    //     message: "2~10자 사이의 닉네임을 입력해 주세요.",
    //   },
    // },
    children: "중복 확인",
    maxLength: 10,
  },
] as const;
