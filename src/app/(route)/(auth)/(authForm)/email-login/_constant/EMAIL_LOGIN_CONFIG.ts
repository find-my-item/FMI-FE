import { InputType } from "../../types/InputType";

export const EMAIL_LOGIN_CONFIG: InputType[] = [
  {
    name: "email",
    label: "아이디(이메일)",
    type: "text",
    placeholder: "이메일을 입력해주세요.",
    validation: {
      required: true,
    },
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    eyeShow: true,
    validation: {
      required: true,
    },
  },
];
