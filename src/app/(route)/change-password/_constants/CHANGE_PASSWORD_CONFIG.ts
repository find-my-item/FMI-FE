export const CHANGE_PASSWORD_CONFIG = [
  {
    inputOption: {
      name: "currentPassword",
      type: "password",
      placeholder: "비밀번호을 입력해 주세요.",
      maxLength: 16,
      validation: {
        required: true,
      },
    },
    label: "현재 비밀번호",
    btnOption: {
      btnLabel: "비밀번호 확인",
    },
  },
  {
    inputOption: {
      name: "newPassword",
      type: "password",
      placeholder: "비밀번호을 입력해 주세요.",
      validation: {
        required: true,
      },
      maxLength: 16,
    },
    caption: {
      rule: "8~16자리, 대문자/소문자/숫자/특수 문자 포함",
      successMessage: "대문자/소문자/숫자/특수 문자 포함 8~16자리 사이",
    },
    label: "새 비밀번호",
  },
  {
    inputOption: {
      name: "newPasswordConfirm",
      type: "password",
      placeholder: "비밀번호 입력해 주세요.",
      maxLength: 16,
      validation: {
        required: true,
      },
    },
    caption: {
      successMessage: "비밀번호가 일치합니다.",
    },
    label: "새 비밀번호 확인",
  },
];
