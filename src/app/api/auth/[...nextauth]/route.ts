import { lookupUser } from "@/routes/auth";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAccount } from "@/routes/common-users";
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
            const refreshToken = jose.decodeJwt(tokens.accessToken);

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
    async signIn({ profile }) {
      try {
        const user = await lookupUser({ email: profile?.email });

        if ("statusCode" in user && user.statusCode == 404) {
          await createAccount({
            email: profile?.email,
            username: profile?.name,
          });

          return true;
        }

        return true;
      } catch (error) {
        console.error("Error during OAuth login:", error);
        return "/auth/logar?error=AccessDenied";
      }
    },
    async jwt({ token, account, user }) {
      if (user && account) {
        if (account.provider !== "credentials") {
          try {
            const backendUser = await lookupUser({ email: user.email! });
            const userInfo = {
              user: {
                id: backendUser.id,
                email: user.email,
                role: backendUser.role,
                username: backendUser.username,
              },
              tokens: {
                access: account.access_token,
                refresh: "",
              },
              validity: {
                valid_until: account.expires_at,
                refresh_until: 0,
              },
            } as User;

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
