import { authCallbackConfig } from '@modules/auth/lib/auth-callbacks.config';
import { authPrismaAdapterConfig } from '@modules/auth/lib/auth-prisma-adapter.config';
import { __PROD__, __URL__ } from '@modules/common/lib/common.constants';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';

import { AUTH_RESEND_KEY, BUSINESS_EMAIL, sendEmailVerificationRequest } from './modules/emails/lib/resend.lib';
import { prisma } from '@read-quill/database';
import { sendWelcomeEmail } from '@modules/emails/lib/emails.lib';
import { UserAvatarUploadPostResponse } from '@modules/api/types/users-api.types';

const createAvatarFromAuthImage = async (image: string, email: string, name: string) => {
  const imageResponse = await fetch(image);
  if (!imageResponse.ok) return;

  const blob = await imageResponse.blob();
  const imageFile = new File([blob], `${name}-avatar`);

  const formData = new FormData();
  formData.append('avatarFile', imageFile);

  const uploadUserAvatarUrl = new URL('/api/user/avatar/upload', __URL__);
  const uploadResponse = await fetch(uploadUserAvatarUrl, {
    method: 'POST',
    body: formData,
  });
  if (!uploadResponse.ok) return;

  const uploadData = (await uploadResponse.json()) as UserAvatarUploadPostResponse;
  if (!uploadData.data) return;

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      avatar: {
        connect: { id: uploadData.data.avatarImage.id },
      },
    },
  });
};

export const { auth, handlers, signIn, signOut } = NextAuth(async () => {
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
      async signIn(message) {
        const { account, profile, user, isNewUser } = message;
        if (!account || !isNewUser) return;

        // Create user avatar if present.
        if (profile?.picture) {
          await createAvatarFromAuthImage(profile.picture, user.email!, user.name!);
        }

        // Profile completed is set to true for all login of new users that dont use the email option.
        const { provider, type } = account;
        if (provider === 'resend' && type === 'email') return;

        await prisma.user.update({ where: { id: user.id }, data: { profileCompleted: true } });
      },
      async createUser(message) {
        try {
          const { name, email } = message.user;
          if (!name || !email) return;

          await sendWelcomeEmail({ email, name });
        } catch (err) {}
      },
    },
  };
});
