import { PrismaAdapter } from '@auth/prisma-adapter';
import { __PROD__ } from '@modules/common/lib/common.constants';
import { prisma } from '@read-quill/database';
import NextAuth from 'next-auth';
import { authCallbacks } from '@modules/auth/lib/auth.callbacks';
import Google from 'next-auth/providers/google';

const { callbacks } = authCallbacks;

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      // const isLoggedIn = !!auth?.user;

      // const isPrivateRoute = privateRoutes.some((route) => nextUrl.pathname.startsWith(route));
      // const isPublicRoute = publicRoutes.some((route) => nextUrl.pathname.startsWith(route));
      // const isApiAuthRoute = nextUrl.pathname.startsWith('/api');

      // if (isPublicRoute || isApiAuthRoute) return true;

      // if (isPrivateRoute) {
      //   if (isLoggedIn) {
      //     return true;
      //   }
      //   return Response.redirect(new URL('/sign-in', nextUrl));
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/', nextUrl));
      // }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  events: {
    async signIn(message) {
      // if (!message.isNewUser) return;

      const email = message.user.email!;

      // await sendEmail({
      //   subject: 'Welcome to Read Quill!',
      //   email,
      //   template: <WelcomeEmail userFirstname={message.user.name!} />,
      // });
    },
  },
});
