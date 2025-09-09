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
  "/projetos/cadastrar",
];

const PROTECTED_PATHS = [
  "/projetos",
  "/solicitacoes",
  "/config/conta",
  "/config/perfil",
  "/admin",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const homepageUrl = new URL("/", req.url);
  const loginUrl = new URL("/auth/logar", req.url);
  const accountUrl = new URL("/config/conta", req.url);
  const flag = req.cookies.get("errorProcessed")?.value;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    token &&
    !flag &&
    !pathname.includes("auth/logar") &&
    ["GoogleAuthError", "RefreshTokenExpired"].includes(token.error)
  ) {
    const res = NextResponse.redirect(
      new URL(`/auth/logar?error=${token?.error}`, req.url)
    );
    res.cookies.set("errorProcessed", "true", {
      path: "/",
      httpOnly: true,
    });

    return res;
  }

  // ignora rotas públicas
  if (
    PUBLIC_PATHS.some((path) => pathname.startsWith(path)) ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !isAdmin(token?.data?.user?.role)) {
    return NextResponse.redirect(homepageUrl);
  }

  if (pathname === "/config" && token) {
    return NextResponse.redirect(accountUrl);
  }

  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p)) && !token) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
