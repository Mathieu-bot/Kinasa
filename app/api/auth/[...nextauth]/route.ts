import NextAuth, { AuthOptions } from "next-auth";
import { type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Extend session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) return false;
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub || "";
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = user?.id || token.sub;
      }
      return token;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
