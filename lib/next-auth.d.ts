import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Extension du type User pour inclure cooperativeId
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    cooperativeId?: string;
  }

  /**
   * Extension du type Session pour exposer cooperativeId dans l'objet user
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      cooperativeId?: string;
    };
  }
}
