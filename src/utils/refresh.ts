import { refreshToken } from "@/routes/auth";

export async function refreshAccessToken(
  refToken: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const tokens = await refreshToken(refToken);

  if (tokens.ok) {
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  return {
    accessToken: "",
    refreshToken: "",
  };
}
