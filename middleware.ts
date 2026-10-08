import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Guard auth by cookie: refresh token httpOnly tidak bisa dibaca client,
// jadi guard cek keberadaan cookie (mis. `refreshToken`). Access token tetap di memory Zustand.
const PROTECTED_PREFIXES = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsGuard = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!needsGuard) return NextResponse.next();

  const hasRefresh = req.cookies.has("refreshToken");
  if (!hasRefresh) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
