export function getAccessToken() {
  return localStorage.getItem("acessiweb-access-token");
}

export function getRefreshToken() {
  return localStorage.getItem("acessiweb-refresh-token");
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("acessiweb-access-token", accessToken);
  localStorage.setItem("acessiweb-refresh-token", refreshToken);
}
