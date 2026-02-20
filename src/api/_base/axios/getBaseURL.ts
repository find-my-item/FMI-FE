/**
 * SSR 시 상대 URL은 origin이 없어 Invalid URL 발생 → 서버에서만 절대 URL 사용
 * 클라이언트에서는 "/api" (Next.js rewrite로 프록시)
 */
export const getBaseURL = (): string => {
  if (typeof window === "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return "/api";
};
