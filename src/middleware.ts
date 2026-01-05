import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // value가 붙지 않으면 객체가 통채로 전달됨. 하지만 내가 쓰고 싶은건 객체가 아닌 쿠키의 값. 그러므로 value를 붙여서 사용해줘야 함.
  const accessToken = request.cookies.get("accessToken")?.value;

  // 로그인이 안 되어 있는데 /dashboard로 접근하려 할 때
  if (!accessToken && request.nextUrl.pathname.startsWith("/mypage/:path*")) {
    // 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 만약 쿠키를 심어서 보내야 한다면
  const response = NextResponse.next(); // 통과라는 뜻 (검문 결과 문제 없으니 원래 가려던 페이지로 진행 시켜~)

  if (accessToken) {
    response.cookies.set("isAuthorized", "true");
  }
  return response;
}

// 2. 미들웨어가 실행될 경로 설정 (Matcher)
export const config = {
  // 아래 경로에서만 미들웨어가 실행됩니다.
  matcher: ["/mypage/:path*", "/email-login", "/write/:path*"],
};

// NextRequest: 사용자가 보낸 편지 (주문서)
// NextResponse: 사용자에게 우리가 보낼 객체 (서빙 카트)
