import { authCallbackConfig } from '@modules/auth/lib/auth-callbacks.config';
import { authPrismaAdapterConfig } from '@modules/auth/lib/auth-prisma-adapter.config';
import { __PROD__, __URL__ } from '@modules/common/lib/common.constants';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';

import { SendWelcomeEmailApiActionData } from '@modules/emails/types/email-validations.types';
import { AUTH_RESEND_KEY, BUSINESS_EMAIL, sendEmailVerificationRequest } from './modules/emails/lib/resend.lib';

export const { auth, handlers, signIn, signOut } = NextAuth(async (req) => {
  return {
    ...authPrismaAdapterConfig,
    ...authCallbackConfig,
    providers: [
      Google,
      Github,
      Resend({
        apiKey: AUTH_RESEND_KEY,
        from: BUSINESS_EMAIL,
        sendVerificationRequest: async (params) => {
          await sendEmailVerificationRequest(params);
        },
      }),
    ],
    pages: {
      signIn: '/auth/sign-in',
      verifyRequest: '/auth/verify-request',
      error: '/auth/error',
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
  };
});
