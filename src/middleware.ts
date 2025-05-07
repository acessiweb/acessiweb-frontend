// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdmin, isCommonUser } from "./common/utils/authorization";
// import { verify } from "jsonwebtoken";

const PUBLIC_PATHS = ["/login", "/sobre", "/_next"];

// function getUser(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   if (!token) return null;
//   try {
//     return verify(token, process.env.JWT_SECRET);
//   } catch {
//     return null;
//   }
// }

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ignora rotas públicas
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const userRole = "ADMIN";

  if (!userRole) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && !isAdmin(userRole)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (pathname.startsWith("/solicitacoes") && !isCommonUser(userRole)) {
    const homePage = new URL("/", req.url);
    return NextResponse.redirect(homePage);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
