import { authCallbackConfig } from '@modules/auth/lib/auth-callbacks.config';

import { __URL__ } from '@modules/common/lib/common.constants';
import { PRIVATE_ROUTES, PUBLIC_ROUTES, SIGN_IN_ROUTE, DEFAULT_AUTHENTICATED_ROUTE } from '@modules/routing/lib/routes';
import { checkIsRoute } from '@modules/routing/lib/routing.lib';
import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const { auth } = NextAuth({ ...authCallbackConfig, providers: [] });

export async function authMiddleware(request: NextRequest) {
  const { nextUrl } = request;

  const session = await auth();
  const isAuthenticated = !!session?.user;

  // Define route types
  const isPrivateRoute = checkIsRoute(PRIVATE_ROUTES, nextUrl.pathname);
  const isPublicRoute = checkIsRoute(PUBLIC_ROUTES, nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api');

  if (isPublicRoute || isApiAuthRoute) return NextResponse.next();

  // Handle private routes
  if (isPrivateRoute) {
    if (isAuthenticated) {
      return NextResponse.next();
    }

    const signInUrl = new URL(SIGN_IN_ROUTE, __URL__);
    signInUrl.searchParams.set('next', nextUrl.pathname);

    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users from non-private routes to the dashboard
  if (isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_ROUTE, nextUrl));
  }

  // Default action: proceed to the requested route
  return NextResponse.next();
}
