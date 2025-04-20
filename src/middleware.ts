import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/members/:path*", "/studyroom/:path*"]
};

export default function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const currentPath = request.nextUrl.pathname;
  if (!authToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
