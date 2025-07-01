"use server";

import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

export async function getAuthSession() {
  const cookieStore = await cookies();

  const simulatedReq: Partial<NextApiRequest> = {
    headers: {
      cookie: cookieStore.toString(),
    },
    cookies: Object.fromEntries(
      cookieStore.getAll().map((c) => [c.name, c.value])
    ),
    query: {},
    body: {},
  };

  const token = await getToken({
    req: simulatedReq as NextApiRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.data.tokens.access;
}
