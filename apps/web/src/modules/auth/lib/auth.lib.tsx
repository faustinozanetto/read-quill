import type { NextAuthOptions, Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@read-quill/database';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from 'next-auth/adapters';
import { __PROD__, __URL__ } from '@modules/common/lib/common.constants';
import { sendEmail } from '@modules/emails/lib/resend.lib';
import { WelcomeEmail } from '@modules/emails/components/templates/welcome-email';

const COOKIES_PREFIX = 'readquill';

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

  events: {
    async signIn(message) {
      // if (!message.isNewUser) return;

      const email = message.user.email!;

      await sendEmail({
        subject: 'Welcome to Read Quill!',
        email,
        template: <WelcomeEmail userFirstname={message.user.name!} />,
      });
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
