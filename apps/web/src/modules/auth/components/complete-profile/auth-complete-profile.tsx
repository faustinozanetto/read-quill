'use client';

import React from 'react';
import AuthCompleteProfileForm from './auth-complete-profile-form';
import { __URL__ } from '@modules/common/lib/common.constants';

import { Separator, useToast } from '@read-quill/design-system';
import { useCompleteProfile } from '@modules/users/hooks/use-complete-profile';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AuthCompleteProfile: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, update } = useSession();

  const { completeProfile, isPending } = useCompleteProfile({
    onSuccess: async (data, variables) => {
      if (data.data?.success) {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: variables.name,
          },
        });
        toast({ variant: 'success', content: 'Profile details saved succssfully!' });
        router.push('/dashboard');
      }
    },
  });

  return (
    <div className="rounded border p-4 px-4 shadow md:p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Complete Profile</h1>
        <p className="max-w-md text-center">
          You're almost there! Please take a moment to complete your profile so we can personalize your experience. Fill
          in the details to unlock all the features and get the most out of your account.
        </p>

        <Separator />

        <AuthCompleteProfileForm onSubmit={completeProfile} isPending={isPending} />
      </div>
    </div>
  );
};

export default AuthCompleteProfile;
