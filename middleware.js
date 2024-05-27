
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req, secret });

    console.log('Token:', token); 

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
    }

    if (!token.isAdmin) { 
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}
