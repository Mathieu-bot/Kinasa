import NextAuth from "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    cooperativeId?: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      cooperativeId?: string;
      role?: string;
    };
  }
}
