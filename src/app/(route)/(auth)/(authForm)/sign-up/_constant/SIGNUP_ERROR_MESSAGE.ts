export const EMAIL_ERROR_MESSAGE = {
  "AUTH409-EMAIL_DUPLICATED": { message: "이미 가입된 이메일이에요.", status: "warning" },
  "AUTH409-EMAIL_RECENTLY_DELETED": {
    message: "최근 탈퇴한 이메일이에요. 7일 후 재가입 해주세요.",
    status: "success",
  },
} as const;
