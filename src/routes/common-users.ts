"use server";

import { CreateCommonUserSchema } from "@/schemas/user.schema";
import fetchData from "../utils/fetch";
import { ApiError } from "@/types/response-api";

export async function createAccount(
  body: Partial<CreateCommonUserSchema>
): Promise<
  | {
      id: string;
    }
  | ApiError
> {
  return await fetchData({
    endpoint: "common-users",
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  });
}

export async function validateGoogleAuth(idToken: string) {
  return await fetchData({
    endpoint: `common-users/google`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    },
  });
}
