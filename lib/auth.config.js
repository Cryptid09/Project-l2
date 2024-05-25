import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { User } from './models';
import { connectToDb } from './utils';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    Providers.Credentials({
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
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});
