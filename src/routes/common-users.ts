"use server";

import { CreateCommonUserSchema } from "@/schemas/user.schema";
import fetchData from "../utils/fetch";
import { ApiError, FetchResponse } from "@/types/fetch";

type FetchUpdateResult = FetchResponse & {
  data: {
    id: string;
  };
};

type FetchTokens = FetchResponse & {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export async function createAccount(
  body: Partial<CreateCommonUserSchema>
): Promise<FetchUpdateResult | ApiError> {
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

export async function validateGoogleAuth(
  idToken: string | undefined
): Promise<FetchTokens | ApiError> {
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
): Promise<FetchTokens | ApiError> {
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
