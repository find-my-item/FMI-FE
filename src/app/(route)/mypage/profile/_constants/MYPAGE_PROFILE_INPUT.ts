export const MYPAGE_PROFILE_INPUT = [
  {
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해 주세요.",
    rule: "2~10자, 특수문자/금칙어 제한",
    children: "중복 확인",
    maxLength: 10,
    validation: {
      required: true,
    },
  },
  {
    name: "email",
    label: "아이디(이메일)",
    type: "text",
    placeholder: "로그인에 사용할 이메일을 입력해주세요.",
    children: "인증번호 발송",
    maxLength: 256,
    validation: {
      required: false,
    },
  },
  {
    name: "emailAuth",
    label: "이메일 인증",
    type: "text",
    placeholder: "인증번호를 입력해주세요.",
    children: "인증번호 확인",
    successMessage: "인증되었습니다.",
    maxLength: 6,
    validation: {
      required: false,
    },
  },
] as const;
