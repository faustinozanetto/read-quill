import { authCallbackConfig } from '@modules/auth/lib/auth-callbacks.config';
import { authPrismaAdapterConfig } from '@modules/auth/lib/auth-prisma-adapter.config';
import { __PROD__ } from '@modules/common/lib/common.constants';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authPrismaAdapterConfig,
  ...authCallbackConfig,
  providers: [Google, Github],
  pages: {
    signIn: '/sign-in',
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
