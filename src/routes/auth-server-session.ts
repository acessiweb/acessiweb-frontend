"use server";

import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

export async function getAuthSession() {
  const cookieStore = await cookies();

  const token = await getToken({
    req: {
      headers: {
        cookie: cookieStore.toString(),
      },
      cookies: Object.fromEntries(
        cookieStore.getAll().map((c) => [c.name, c.value])
      ),
    } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.data.tokens.access;
}
