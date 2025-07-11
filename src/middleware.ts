"use server";

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdmin } from "./utils/authorization";

const PUBLIC_PATHS = [
  "/auth/logar",
  "/auth/criar-conta",
  "/admin/auth/logar",
  "/diretrizes",
  "/config/preferencias",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const homepageUrl = new URL("/", req.url);
  const loginUrl = new URL("/auth/logar", req.url);
  const accountUrl = new URL("/config/conta", req.url);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ignora rotas públicas
  if (
    PUBLIC_PATHS.some((path) => pathname.startsWith(path)) ||
    pathname === "/"
  ) {
    if (
      token &&
      "user" in token.data &&
      isAdmin(token.data.user.role) &&
      (pathname === "/" || pathname === "/diretrizes")
    ) {
      const adminHomepageUrl = new URL("/admin", req.url);
      return NextResponse.redirect(adminHomepageUrl);
    }

    return NextResponse.next();
  }

  if (token && "user" in token.data) {
    if (pathname.startsWith("/admin") && !isAdmin(token.data.user.role)) {
      return NextResponse.redirect(homepageUrl);
    }

    if (pathname === "/config") {
      return NextResponse.redirect(accountUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
