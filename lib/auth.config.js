import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { User } from './models';
import { connectToDb } from './utils';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        await connectToDb();
        const user = await User.findOne({ username: credentials.username });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id, name: user.username };
        }
        throw new Error('Invalid username or password');
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login', 
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; 
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
