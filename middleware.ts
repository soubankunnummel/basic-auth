import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // If the user is not authenticated
  if (!token) {
    // Allow access to home, login, and register pages
    if (
      request.nextUrl.pathname !== "/" &&
      request.nextUrl.pathname !== "/login" &&
      request.nextUrl.pathname !== "/register"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If the user is authenticated, redirect from login and register pages to home
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
