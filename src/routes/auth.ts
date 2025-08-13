import { ResponseCustom } from "@/types/response";
import fetchData from "@/utils/fetch";

export async function refreshToken(
  refreshToken: string
): Promise<ResponseCustom & { accessToken: string; refreshToken: string }> {
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
