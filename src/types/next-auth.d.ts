import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    provider?: string;
    mobilePhone?: string;
    accessToken?: string;
    refreshToken?: string;
    iat?: number;
    exp?: number;
    iss?: string;
    id?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    mobilePhone?: string;
    accessToken?: string;
    refreshToken?: string;
    iat?: number;
    exp?: number;
    iss?: string;
    sub?: string;
    role?: string;
  }
}
