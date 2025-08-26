import { FetchResponse } from "@/types/fetch";
import fetchData from "@/utils/fetch";

type FetchTokens = FetchResponse & {
  data: { accessToken: string; refreshToken: string };
};

export async function refreshToken(refreshToken: string): Promise<FetchTokens> {
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
