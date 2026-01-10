import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { fetchRefreshToken } from "./api/fetch/auth";
import { getCookieValue } from "./utils";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // 현재 경로
  const currentPath = request.nextUrl.pathname;

  // 접근 제한 페이지 url
  const isProtectPath = currentPath.startsWith("/mypage") || currentPath.startsWith("/write");

  // 로그인 관련 페이지
  const isAuthPath =
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/email-login") ||
    currentPath.startsWith("/sign-up");

  // accessToken이 있을때
  if (accessToken) {
    // 만약 로그인 페이지로 진입하려고 한다면
    if (isAuthPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // accessToken은 없고 리프레쉬 토큰만 있을때
  if (!accessToken && refreshToken) {
    try {
      // 리프레쉬 토큰으로 토큰 재발급
      const res = await fetchRefreshToken(refreshToken);

      // 재발급 성공
      if (res.ok) {
        const cookieStrings = await res.headers.getSetCookie();

        const newAccessToken = getCookieValue({
          name: "access_token",
          cookieStrings: cookieStrings,
        });
        const newRefreshToken = getCookieValue({
          name: "refresh_token",
          cookieStrings: cookieStrings,
        });

        // 만약 로그인 관련 화면인지 확인 후 메인 페이지로 리다이렉트
        if (isAuthPath) {
          const response = NextResponse.redirect(new URL("/", request.url));

          newAccessToken &&
            response.cookies.set("access_token", newAccessToken, { path: "/", httpOnly: true });
          newRefreshToken &&
            response.cookies.set("refresh_token", newRefreshToken, { path: "/", httpOnly: true });
          response.cookies.set("isAuthorized", "true", { path: "/" });

          return response;
        }
        const response = NextResponse.next();

        // 새 쿠키 설정
        response.cookies.set("access_token", newAccessToken, { path: "/", httpOnly: true });
        response.cookies.set("refresh_token", newRefreshToken, { path: "/", httpOnly: true });
        response.cookies.set("isAuthorized", "true", { path: "/", httpOnly: true });

        return response;
      } else {
        // 재발급 실패
        throw new Error("Refresh Failed");
      }
    } catch (error) {
      // 재발급 실패 처리

      if (isAuthPath) {
        const response = NextResponse.next();

        response.cookies.delete({ name: "access_token", path: "/" });
        response.cookies.delete({ name: "refresh_token", path: "/" });
        response.cookies.delete({ name: "isAuthorized", path: "/" });

        return response;
      }

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

      const response = NextResponse.redirect(loginUrl);

      response.cookies.delete({ name: "access_token", path: "/" });
      response.cookies.delete({ name: "refresh_token", path: "/" });
      response.cookies.delete({ name: "isAuthorized", path: "/" });
      return response;
    }
  }

  // 로그인이 안 되어 있는데 토큰이 필요한 페이지로 접근
  if (isProtectPath) {
    const loginUrl = new URL("/login", request.url);
    const fullUrl = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("callbackUrl", fullUrl);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어 실행 경로
export const config = {
  matcher: [
    "/mypage/:path*",
    "/email-login",
    "/login",
    "/sign-up",
    "/write/:path*",
    "/chat/:path*",
  ],
};
