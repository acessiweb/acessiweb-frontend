import NextAuth, { DecodedJWT, NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jose from "jose";
import { validateGithubAuth, validateGoogleAuth } from "@/routes/common-users";
import { refreshAccessToken } from "@/utils/refresh";

function getUser(tokens: { accessToken: string; refreshToken: string }) {
  const accessToken = jose.decodeJwt(tokens.accessToken) as DecodedJWT;
  const refreshToken = jose.decodeJwt(tokens.refreshToken) as DecodedJWT;

  return {
    user: {
      id: accessToken.sub,
      email: accessToken.email,
      role: accessToken.role,
      username: accessToken.username,
    },
    tokens: {
      access: {
        exp: accessToken.exp,
        iat: accessToken.iat,
        token: tokens.accessToken,
      },
      refresh: {
        exp: refreshToken.exp,
        iat: refreshToken.iat,
        token: tokens.refreshToken,
      },
    },
  } as User;
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, mobilePhone, password } = credentials as {
          email?: string;
          mobilePhone?: string;
          password: string;
        };

        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            mobilePhone,
            password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const tokens = await response.json();

        if (response.ok) {
          if (tokens.accessToken) {
            return getUser(tokens);
          }
          return null;
        }

        throw new Error(JSON.stringify(tokens.errors));
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user && account) {
        if (account.provider === "google") {
          const tokens = await validateGoogleAuth(account?.id_token);

          if (tokens.ok) {
            return {
              ...token,
              provider: "google",
              data: getUser(tokens),
              error: "",
            };
          }

          return {
            ...token,
            data: {} as User,
            error: "GoogleAuthError",
          };
        }

        if (account.provider === "github") {
          const tokens = await validateGithubAuth(account?.access_token);

          if (tokens.ok) {
            return {
              ...token,
              provider: "github",
              data: getUser(tokens),
              error: "",
            };
          }

          return {
            ...token,
            data: {} as User,
            error: "GithubAuthError",
          };
        }

        return { ...token, data: user, provider: "credentials", error: "" };
      }

      if (!token.error && token.data.tokens.access.exp) {
        const timeNowSecs = Date.now() / 1000;

        if (timeNowSecs >= token.data.tokens.access.exp) {
          const tokens = await refreshAccessToken(
            token.data.tokens.refresh.token
          );

          if (tokens.accessToken) {
            user = getUser(tokens);
          } else {
            user = {} as User;
          }

          return { ...token, data: user };
        }

        return { ...token };
      }

      return {
        ...token,
        error: "",
      };
    },
    async session({ session, token }) {
      session.user = token.data.user;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
