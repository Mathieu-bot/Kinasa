import NextAuth, { AuthOptions } from "next-auth";
import { type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

// Extend session types
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      cooperativeId?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends Omit<PrismaUser, "password"> {
    id: string;
    role?: string;
    cooperativeId?: string | null;
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
    CredentialsProvider<{
      email: { label: string; type: string };
      password: { label: string; type: string };
    }>({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const dbUser = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!dbUser || !dbUser.password) {
          throw new Error("Email does not exist");
        }

        // Use bcrypt to securely compare passwords
        const isCorrectPassword = await compare(credentials.password, dbUser.password);

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        // Create a user object that matches next-auth User interface
        // Omit the password field for security
        const user = {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          image: dbUser.image,
          role: dbUser.role,
          cooperativeId: dbUser.cooperativeId,
          emailVerified: dbUser.emailVerified,
          createdAt: dbUser.createdAt,
          updatedAt: dbUser.updatedAt
        };

        return user;
      }
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
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;
      
      // Pass cooperativeId from token to session if it exists
      if ('cooperativeId' in token) {
        session.user.cooperativeId = token.cooperativeId as string;
      }
      
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        // Include cooperativeId if it exists in the user object
        if ('cooperativeId' in user) {
          token.cooperativeId = user.cooperativeId;
        }
      }
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
