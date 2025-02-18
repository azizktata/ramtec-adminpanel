import NextAuth, { User as NextAuthUser, DefaultUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./zod";
import { getUserFromDb } from "@/actions/user";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & NextAuthUser;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    role: Role;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          // logic to salt and hash password

          // logic to verify if the user exists
          const user = await getUserFromDb(email, password);
          if (!user) {
            throw new Error("Invalid credentials.");
          }

          // return user object with their profile data
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach id and role to the session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Attach additional properties to the token
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
});
