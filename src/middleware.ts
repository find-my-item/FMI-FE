import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.has("access_token");
  const refreshToken = request.cookies.has("refresh_token");

  const currentPath = request.nextUrl.pathname;

  const isAuthPath =
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/email-login") ||
    currentPath.startsWith("/sign-up");

  const isProtectPath =
    currentPath.startsWith("/mypage") ||
    currentPath.startsWith("/write") ||
    currentPath.startsWith("/chat");

  if (isAuthPath && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectPath && !accessToken && !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", currentPath);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

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
