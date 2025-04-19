import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/article/:path*", "/members/:path*", "/studyroom/:path*"]
};

export default function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const currentPath = request.nextUrl.pathname;

  console.log("Middleware running:", {
    path: currentPath,
    hasToken: !!authToken
  });

  if (!authToken) {
    console.log("Redirecting to home due to missing token");
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
