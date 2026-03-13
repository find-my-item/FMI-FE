import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.has("refresh_token");

  const currentPath = request.nextUrl.pathname;

  const isAuthPath = currentPath.startsWith("/login") || currentPath.startsWith("/sign-up");

  const isProtectPath =
    currentPath.startsWith("/mypage/") ||
    currentPath.startsWith("/write") ||
    currentPath.startsWith("/chat") ||
    currentPath.startsWith("/alert") ||
    currentPath.startsWith("/change-password") ||
    currentPath.startsWith("/admin");

  const isAdminPath = currentPath.startsWith("/admin");

  const isSessionExpired = request.nextUrl.searchParams.get("reason") === "session-expired";

  // 토큰이 있는데 로그인, 회원가입 페이지에 접근하려고 할때 (리프레쉬 토큰 만료됐을때는 제외)
  const RedirectMypage = isAuthPath && (accessToken || refreshToken) && !isSessionExpired;

  if (RedirectMypage) {
    return NextResponse.redirect(new URL("/mypage", request.url));
  }

  // 리프레쉬 토큰이 없는 상황에서 보호된 페이지 접근하려고 할 때
  if (isProtectPath && !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", currentPath);

    return NextResponse.redirect(loginUrl);
  }

  // 관리자 페이지 접근하려고 할 때
  if (isAdminPath) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const payload = jwtDecode<JwtPayload>(accessToken);

      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage/:path+",
    "/login/:path*",
    "/sign-up",
    "/write/:path*",
    "/chat/:path*",
    "/alert/:path*",
    "/change-password",
    "/admin/:path*",
  ],
};
