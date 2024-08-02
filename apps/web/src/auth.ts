import { authCallbackConfig } from '@modules/auth/lib/auth-callbacks.config';
import { authPrismaAdapterConfig } from '@modules/auth/lib/auth-prisma-adapter.config';
import { __PROD__, __URL__ } from '@modules/common/lib/common.constants';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';

import { SendWelcomeEmailApiActionData } from '@modules/emails/types/email-validations.types';

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
    async createUser(message) {
      try {
        const email = message.user.email!;

        const payload: SendWelcomeEmailApiActionData = {
          completeName: message.user.name!,
          subject: 'Welcome to Read Quill!',
          target: email,
        };

        const url = new URL('/api/emails/welcome', __URL__);
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      } catch (err) {}
    },
  },
});
