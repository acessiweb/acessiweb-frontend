import { lookupUser } from "@/routes/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAccount } from "@/routes/common-users";
import * as jose from "jose";

const authOptions: NextAuthOptions = {
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

        const fetched = await response.json();

        if (response.ok) {
          if (fetched.accessToken) {
            const user = jose.decodeJwt(fetched.accessToken);

            return {
              ...user,
              ...fetched,
              id: user.sub,
            };
          }
          return null;
        }

        throw new Error(fetched.errors[0].message);
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

        if (!user) {
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
      if (account && account.provider !== "credentials") {
        token.provider = account.provider;
        try {
          const backendUser = await lookupUser({ email: user.email! });
          if (backendUser.id) {
            token.id = backendUser.id;
            token.role = backendUser.role;
          }
        } catch (error) {
          console.error("Failed to fetch backend user:", error);
        }
      }

      if (user && user.role) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.email = user.email;
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session?.user || !token) {
        return session;
      }

      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
