"use server";

import { CreateCommonUserSchema } from "@/schemas/user.schema";
import fetchData from "../utils/fetch";
import { ApiError } from "@/types/response-api";
import { ResponseCustom } from "@/types/response";

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

export async function validateGoogleAuth(idToken: string | undefined): Promise<
  ResponseCustom & {
    accessToken: string;
    refreshToken: string;
  }
> {
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

export async function validateGithubAuth(
  accessToken: string | undefined
): Promise<
  ResponseCustom & {
    accessToken: string;
    refreshToken: string;
  }
> {
  return await fetchData({
    endpoint: `common-users/github`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
      }),
    },
  });
}
