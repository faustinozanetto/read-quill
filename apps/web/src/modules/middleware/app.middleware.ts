import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function AppMiddleware(req: NextRequest): Promise<NextResponse> {
  // const session = await getToken({
  //   req,
  //   cookieName: 'readquill.session-token',
  // });

  // Not logged in redirect.
  // if (!session) {
  //   const signInUrl = new URL('/sign-in', req.url);
  //   signInUrl.searchParams.set('next', req.nextUrl.pathname);

  //   return NextResponse.redirect(signInUrl);
  // }

  return NextResponse.rewrite(req.nextUrl);
}
