import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const handlers = {
  GET: async (req, res) => {
    try {
      res.status(200).json({ message: "GET request handled successfully" });
    } catch (error) {
      console.error("Error handling GET request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  POST: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password" });
      }

      const user = await login({ username, password });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error handling POST request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

const options = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    ...authConfig.callbacks,
  },
};

export const auth = (req, res) => NextAuth(req, res, options);
export const { signIn, signOut } = NextAuth(options);
