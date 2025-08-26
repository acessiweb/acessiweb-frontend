import { refreshToken } from "@/routes/auth";

export async function refreshAccessToken(
  refToken: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await refreshToken(refToken);

  if (res.ok && "data" in res) {
    return {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
  }

  return {
    accessToken: "",
    refreshToken: "",
  };
}
