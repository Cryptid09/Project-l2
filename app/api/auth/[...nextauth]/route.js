import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';

const handler = (req, res) => NextAuth(req, res, authConfig);

export { handler as GET, handler as POST };

