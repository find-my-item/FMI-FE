export const CHANGE_PASSWORD_CONFIG = [
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해 주세요.",
    rule: "8~16자리, 대문자/소문자/숫자/특수 문자 포함",
    eyeShow: true,
    successMessage: "대문자/소문자/숫자/특수 문자 포함 8~16자리 사이",
    maxLength: 16,
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호 입력해 주세요.",
    eyeShow: true,
    successMessage: "비밀번호가 일치합니다.",
    maxLength: 16,
  },
];
