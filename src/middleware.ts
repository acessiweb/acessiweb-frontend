"use server";

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdmin } from "./common/utils/authorization";

const PUBLIC_PATHS = [
  "/",
  "/auth/logar",
  "/auth/criar-conta",
  "/admin/auth/logar",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ignora rotas públicas
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token && token.role) {
    if (pathname.startsWith("/admin") && !isAdmin(token.role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.next();
  }

  const loginUrl = new URL("/auth/logar", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
