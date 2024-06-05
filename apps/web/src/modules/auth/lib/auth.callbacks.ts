import { NextAuthConfig } from 'next-auth';
import { privateRoutes, publicRoutes } from './routes.lib';

export const authCallbacks = {
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isPrivateRoute = privateRoutes.some((route) => nextUrl.pathname.startsWith(route));
      const isPublicRoute = publicRoutes.some((route) => nextUrl.pathname.startsWith(route));
      const isApiAuthRoute = nextUrl.pathname.startsWith('/api');

      if (isPublicRoute || isApiAuthRoute) return true;

      if (isPrivateRoute) {
        if (isLoggedIn) {
          return true;
        }
        return Response.redirect(new URL('/sign-in', nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
