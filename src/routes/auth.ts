import { ApiError, FetchResponse } from "@/types/fetch";
import fetchData from "@/utils/fetch";

type FetchTokens = FetchResponse & {
  data: { accessToken: string; refreshToken: string };
};

export async function refreshToken(
  refreshToken: string
): Promise<FetchTokens | ApiError> {
  return await fetchData({
    endpoint: "auth/refresh",
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    },
  });
}

export async function login(
  credentials: { email?: string; mobilePhone?: string; password: string },
  isAdmin: string
): Promise<FetchTokens | ApiError> {
  return await fetchData({
    endpoint: `/auth/${isAdmin == "true" ? "admin/login" : "login"}`,
    config: {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    },
  });
}
