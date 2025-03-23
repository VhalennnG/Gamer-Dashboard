import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // If trying to access protected routes without token, redirect to login
  if (
    (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If trying to access login page with token, redirect to dashboard
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*"],
};
