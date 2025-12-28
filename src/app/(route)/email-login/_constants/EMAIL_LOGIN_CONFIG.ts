export const EMAIL_LOGIN_CONFIG = [
  {
    name: "email",
    label: "아이디(이메일)",
    type: "text",
    placeholder: "이메일을 입력해주세요.",
    eyeShow: false,
    validation: {
      required: true,
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "이메일 형식을 입력해 주세요." },
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
] as const;
