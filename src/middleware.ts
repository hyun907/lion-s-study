import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/members/:path*", "/studyroom/:path*"]
};

export default function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const currentPath = request.nextUrl.pathname;

  // 토큰이 없거나 유효하지 않은 경우
  if (!authToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.cookies.set("auth_token", authToken.value, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일
    secure: true,
    sameSite: "strict"
  });

  return response;
}
