export const CHANGE_PASSWORD_CONFIG = [
  {
    name: "currentPassword",
    label: "현재 비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해 주세요.",
    eyeShow: true,
    maxLength: 16,
    children: "비밀번호 확인",
    validation: {
      required: true,
    },
  },
  {
    name: "newPassword",
    label: "새 비밀번호",
    type: "password",
    placeholder: "비밀번호을 입력해 주세요.",
    rule: "8~16자리, 대문자/소문자/숫자/특수 문자 포함",
    eyeShow: true,
    successMessage: "대문자/소문자/숫자/특수 문자 포함 8~16자리 사이",
    maxLength: 16,
    validation: {
      required: true,
    },
  },
  {
    name: "newPasswordConfirm",
    label: "새 비밀번호 확인",
    type: "password",
    placeholder: "비밀번호 입력해 주세요.",
    eyeShow: true,
    successMessage: "비밀번호가 일치합니다.",
    errorMessage: "비밀번호가 일치하지 않습니다.",
    maxLength: 16,
    validation: {
      required: true,
    },
  },
];
