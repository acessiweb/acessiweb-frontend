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

export async function refreshGoogleAccessToken(
  refToken: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refToken,
    });

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
    return {
      accessToken: "",
      refreshToken: "",
    };
  }

  return {
    accessToken: refreshedTokens.access_token,
    refreshToken: refreshedTokens.refresh_token,
  };
}

export async function refreshGithubAccessToken(
  refToken: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refToken,
    });

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
    return {
      accessToken: "",
      refreshToken: "",
    };
  }

  return {
    accessToken: refreshedTokens.access_token,
    refreshToken: refreshedTokens.refresh_token,
  };
}
