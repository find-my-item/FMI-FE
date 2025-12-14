export const FIND_PW_ERROR = {
  COMMON400: { message: "이메일 형식에 맞지 않아요.", status: "warning" },
  "USER404-NOT_FOUND": { message: "등록되지 않은 이메일이에요.", status: "warning" },
  COMMON500: { message: "서버에러로 관리자에게 문의해주세요.", status: "warning" },
  // TODO(수현): 해당 이메일은 소셜 로그인 계정이에요 case 추가 요청
} as const;
