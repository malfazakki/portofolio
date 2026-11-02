import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const COOKIE_NAME = "portfolio_admin_session";
const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "default_fallback_secret_key_32_characters_long_min!"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Exclude /admin/login
    if (pathname === "/admin/login") {
      // If already logged in, redirect to /admin
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token) {
        try {
          await jwtVerify(token, SECRET_KEY);
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch {
          // Token invalid, allow staying on login
        }
      }
      return NextResponse.next();
    }

    // Check token for all other /admin routes
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      // Expired or invalid token
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

