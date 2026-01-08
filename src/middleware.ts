import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // value가 붙지 않으면 객체가 통채로 전달됨. 하지만 내가 쓰고 싶은건 객체가 아닌 쿠키의 값. 그러므로 value를 붙여서 사용해줘야 함.
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // 현재 페이지
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

    // 만약 쿠키를 심어서 보내야 한다면
    const response = NextResponse.next(); // 통과라는 뜻 (검문 결과 문제 없으니 원래 가려던 페이지로 진행 시켜~)
    response.cookies.set("isAuthorized", "true");
    return response;
  }

  // accessToken은 없고 리프레쉬 토큰만 있을때
  if (!accessToken && refreshToken) {
    // 리프레쉬 토큰으로 토큰 재발급
    console.log("미들웨어: 토큰 재발급 시도!! ");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (res.ok) {
        // 재발급 성공
        const data = await res.json();
        const newAccessToken = data.access_token;
        const newRefreshToken = data.refresh_token;

        // 만약 로그인 관련 화면인지 확인 후 메인 페이지로 리다이렉트
        if (isAuthPath) {
          const response = NextResponse.redirect(new URL("/", request.url));

          response.cookies.set("access_token", newAccessToken, { path: "/", httpOnly: true });
          response.cookies.set("refresh_token", newRefreshToken, { path: "/", httpOnly: true });
          response.cookies.set("isAuthorized", "true");
          console.log("로그인 페이지 & 리프레시 토큰 재발급 성공~");

          return response;
        }
        const response = NextResponse.next();

        // 새 쿠키 설정
        response.cookies.set("access_token", newAccessToken, { path: "/", httpOnly: true });
        response.cookies.set("refresh_token", newRefreshToken, { path: "/", httpOnly: true });
        response.cookies.set("isAuthorized", "true");
        console.log("토큰 재발급 성공!!");

        return response;
      } else {
        // 재발급 실패
        console.log("재발급 실패");
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

  // 로그인이 안 되어 있는데 토큰이 필요한 페이지로 접근할 때
  if (isProtectPath) {
    console.log("접근할 수 없는 페이지");

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// NextRequest: 사용자가 보낸 편지 (주문서)
// NextResponse: 사용자에게 우리가 보낼 객체 (서빙 카트)

// 미들웨어가 실행될 경로 설정 (Matcher)
export const config = {
  // 아래 경로에서만 미들웨어가 실행됩니다.
  matcher: ["/mypage/:path*", "/email-login", "/login", "/sign-up", "/write/:path*"],
};
