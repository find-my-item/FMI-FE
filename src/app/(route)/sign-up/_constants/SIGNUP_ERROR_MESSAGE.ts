export const SIGNUP_ERROR_MESSAGE = {
  "AUTH409-EMAIL_DUPLICATED": { message: "이미 가입된 이메일이에요.", status: "warning" },
  "AUTH409-EMAIL_RECENTLY_DELETED": {
    message: "최근 탈퇴한 이메일이에요. 7일 후 재가입 해주세요.",
    status: "success",
  },
  COMMON400: { message: "잘못된 요청이에요", status: "error" },
} as const;

export const EMAIL_ERROR_MESSAGE = {
  _EMAIL_DUPLICATED: { message: "이미 존재하는 이메일이에요.", status: "warning" },
  _EMAIL_RECENTLY_DELETED: {
    message: "최근 탈퇴한 이메일이에요. 7일 후 재가입 해주세요.",
    status: "warning",
  },
} as const;

export const NICKNAME_ERROR_MESSAGE = {
  NICKNAME_INVALID: { message: "닉네임에 금칙어가 포함되어 있습니다.", status: "warning" },
  NICKNAME_DUPLICATE: { message: "중복된 닉네임입니다.", status: "warning" },
} as const;

export const EMAIL_CHECK_CODE_MESSAGE = {
  _INVALID_CREDENTIALS: { message: "인증번호가 일치하지 않아요.", status: "warning" },
  "AUTH400-EMAIL_VERIFY_FAILED": {
    message: "인증번호가 만료되었거나 일치하지 않아요.",
    status: "warning",
  },
} as const;
