import type { NextAuthConfig } from "next-auth";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

import { POST as POSTAPI } from "@/fetcher";


type CredentialToken = {
  email: string;
  access: {
    token: string;
    validUntil: number;
  };
  refresh: {
    token: string;
    validUntil: number;
  };
};

export const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data, error } = await POSTAPI("/auth/login", {
          body: {
            email: credentials.email as string,
            password: credentials.password as string,
          },
        });

        if (error) return null;

        const access = jwtDecode(data.accessToken);
        const refresh = jwtDecode(data.refreshToken);

        return {
          email: data?.email || "",
          access: {
            token: data?.accessToken || "",
            validUntil: access.exp,
          },
          refresh: {
            token: data?.refreshToken || "",
            validUntil: refresh.exp,
          },
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      const credentialToken = token as CredentialToken;
      const isExpired =
        new Date().getTime() >
        (credentialToken?.access?.validUntil || 0) * 1000;

      if (!isExpired) return token;

      const { data, error } = await POSTAPI("/auth/refresh", {
        headers: {
          authorization: `Refresh ${credentialToken?.refresh?.token}`,
        },
        body: {
          refresh: credentialToken?.refresh?.token,
        },
      });

      if (error) return null;

      const access = jwtDecode(data.accessToken);
      const refresh = jwtDecode(data.refreshToken);

      return {
        ...credentialToken,
        access: {
          token: data?.accessToken || "",
          validUntil: access.exp,
        },
        refresh: {
          token: data?.refreshToken || "",
          validUntil: refresh.exp,
        },
      };
    },
    async session({ token, session }) {
      // @ts-ignore
      session.accessToken = token.access.token;
      // @ts-ignore
      session.refreshToken = token.refresh.token;
      return session;
    },
  },
  pages: {},
} satisfies NextAuthConfig;

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(config);
