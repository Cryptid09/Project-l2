import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  // ... your existing login logic
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // ... your existing credentials provider logic
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // ... your existing signIn callback logic
      return true;
    },
    ...authConfig.callbacks,
  },
});