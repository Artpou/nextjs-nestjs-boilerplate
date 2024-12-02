import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
            {
              method: "POST",
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) return null;
          const user = await res.json();
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },
    async session({ token, session }: { token: any; session: any }) {
      session.user = {
        id: token.user.id.toString(),
        email: token.user.email,
        name: token.user.name,
        emailVerified: null,
      };
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(config);

async function refreshToken(token: any) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/refresh",
    {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    }
  );

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}
