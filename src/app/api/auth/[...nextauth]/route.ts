import { validateGoogleAuth } from "@/routes/auth";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jose from "jose";
import { JWT } from "next-auth/jwt";

// async function refreshAccessToken(nextAuthJWT: JWT): Promise<JWT> {
//   try {
//     // Get a new access token from backend using the refresh token
//     const res = await refresh(nextAuthJWT.data.tokens.refresh);
//     const accessToken: BackendAccessJWT = await res.json();

//     if (!res.ok) throw accessToken;
//     const { exp }: DecodedJWT = jwtDecode(accessToken.access);

//     // Update the token and validity in the next-auth object
//     nextAuthJWT.data.validity.valid_until = exp;
//     nextAuthJWT.data.tokens.access = accessToken.access;
//     // Ensure the returned jwt has a new object reference ID
//     // (jwt will not be updated otherwise)
//     return { ...nextAuthJWT };
//   } catch (error) {
//     console.debug(error);
//     return {
//       ...nextAuthJWT,
//       error: "RefreshAccessTokenError"
//     };
//   }
// }

function getUser(tokens: { accessToken: string; refreshToken: string }) {
  const accessToken = jose.decodeJwt(tokens.accessToken) as {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    username: string;
  };
  const refreshToken = jose.decodeJwt(tokens.refreshToken);

  return {
    user: {
      id: accessToken.sub,
      email: accessToken.email,
      role: accessToken.role,
      username: accessToken.username,
    },
    tokens: {
      access: tokens.accessToken,
      refresh: tokens.refreshToken,
    },
    validity: {
      valid_until: accessToken.exp,
      refresh_until: refreshToken.exp,
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
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user && account) {
        if (account.provider === "google") {
          try {
            const tokens = await validateGoogleAuth(account.id_token!);
            const userInfo = getUser(tokens);
            return { ...token, data: userInfo };
          } catch {
            return Promise.reject(undefined);
          }
        }

        return { ...token, data: user };
      }

      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },
    async session({ session, token }) {
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
