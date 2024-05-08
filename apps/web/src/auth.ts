import { PrismaAdapter } from '@auth/prisma-adapter';
import { __PROD__ } from '@modules/common/lib/common.constants';
import { prisma } from '@read-quill/database';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const COOKIES_PREFIX = 'readquill';

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
