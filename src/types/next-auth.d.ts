import type { User } from "next-auth";

const errors =
  "RefreshTokenExpired" | "RefreshAccessTokenError" | "GoogleAuthError";

declare module "next-auth" {
  export interface UserObject {
    id: string;
    email: string;
    role: string;
    username: string;
  }

  export interface DecodedJWT {
    sub: string;
    email?: string;
    role?: string;
    iat: number;
    exp: number;
    aud?: string;
    iss?: string;
    username?: string;
  }

  export interface User {
    tokens: {
      access: DecodedJWT & { token: string };
      refresh: DecodedJWT & { token: string };
    };
    user: UserObject;
  }

  export interface Session {
    user: UserObject;
    error: errors;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    data: User;
    error: errors;
  }
}
