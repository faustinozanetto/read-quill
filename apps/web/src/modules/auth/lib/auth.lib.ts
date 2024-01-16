import type { NextAuthOptions, Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@read-quill/database';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { __PROD__, __URL__ } from '@modules/common/lib/common.constants';
import type { Adapter } from 'next-auth/adapters';

const COOKIES_PREFIX = 'readquill';

export const getSession = async (cookie: string): Promise<Session> => {
  const response = await fetch(`${__URL__}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
};

export const getCurrentUser = async (): Promise<Session['user'] | null> => {
  const user = await getServerSession(authOptions);
  if (!user) return null;

  return user.user;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/sign-in',
  },

  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;

      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: `${COOKIES_PREFIX}.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: __PROD__,
      },
    },
    callbackUrl: {
      name: `${COOKIES_PREFIX}.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: __PROD__,
      },
    },
    csrfToken: {
      name: `${COOKIES_PREFIX}.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: __PROD__,
      },
    },
    pkceCodeVerifier: {
      name: `${COOKIES_PREFIX}.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: __PROD__,
      },
    },
    state: {
      name: `${COOKIES_PREFIX}.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: __PROD__,
      },
    },
  },
};
