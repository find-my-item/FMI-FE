import { RegisterOptions } from "react-hook-form";

export type FormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreements: {
    termsofService: boolean;
    privacyPolicy: boolean;
    marketing: boolean;
  };
};

export type InputType = {
  name: string;
  label?: string;
  className?: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  required?: boolean;
  onConfirm?: React.FocusEventHandler<HTMLInputElement>;
  rule?: string; // 닉네임 규칙 안내 문구
  eyeShow?: boolean;
  btnText?: string;
};

export const SIGNUP_INPUT_DATA: InputType[] = [
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
    btnText: "인증번호 발송",
  },
  {
    name: "emailAuth",
    label: "이메일 인증",
    type: "text",
    placeholder: "인증번호를 입력해주세요.",
    validation: {
      required: true,
    },
    btnText: "인증번호 확인",
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해 주세요.",
    rule: "8~16자리, 영문/숫자/특수 문자 포함",
    eyeShow: true,
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
    eyeShow: true,
    validation: {
      required: true,
      validate: (value, formValue) =>
        value === formValue.password || "비밀번호가 일치하지 않습니다.",
      deps: ["password"],
    },
  },
  {
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해 주세요.",
    rule: "2~10자, 특수문자/금칙어 제한",
    validation: {
      required: true,
      maxLength: {
        value: 10,
        message: "2~10자 사이의 닉네임을 입력해 주세요.",
      },
    },
    btnText: "중복 확인",
  },
];
