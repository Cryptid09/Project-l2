
import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/utils';

export async function GET() {
  try {
    const csrfToken = generateCsrfToken();
    return NextResponse.json({ csrfToken }, { status: 200 });
  } catch (error) {
    console.error('Failed to generate CSRF token:', error);
    return NextResponse.json({ error: 'Failed to generate CSRF token' }, { status: 500 });
  }
}

