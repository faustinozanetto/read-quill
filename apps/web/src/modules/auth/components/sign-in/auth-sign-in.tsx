'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import type { BuiltInProviderType } from 'next-auth/providers/index';
import { Button, useToast, GithubIcon, GoogleIcon, Separator, MailIcon } from '@read-quill/design-system';
import { useSearchParams } from 'next/navigation';
import type { AuthSignInOption } from '@modules/auth/types/auth.types';
import AuthSignInMail from './auth-sign-in-mail';

export const AUTH_SIGN_IN_OPTIONS: AuthSignInOption[] = [
  {
    provider: 'github',
    label: 'GitHub',
    icon: <GithubIcon className="mr-2" />,
  },
  {
    provider: 'google',
    label: 'Google',
    icon: <GoogleIcon className="mr-2" />,
  },
];

const AuthSignIn: React.FC = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const handleAuthSignIn = async (provider: BuiltInProviderType): Promise<void> => {
    try {
      const next = searchParams.get('next') ?? '/dashboard';

      await signIn(provider, { redirect: true, callbackUrl: next });
    } catch (error) {
      toast({ variant: 'error', content: 'An error occurred while signing in!' });
    }
  };

  return (
    <div className="rounded border p-4 px-4 md:p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Sign In Now</h1>
        <p className="max-w-md text-center">
          Join us now to access a range of powerful features. Create and manage shortened URLs effortlessly, track link
          performance. Sign In today and unleash the full potential of our platform for your online success.
        </p>
        <div className="flex flex-col w-full gap-2">
          {AUTH_SIGN_IN_OPTIONS.map((option) => {
            return (
              <Button
                aria-label={`Sign In With ${option.label}`}
                title={`Sign In With ${option.label}`}
                key={option.provider}
                onClick={async () => {
                  await handleAuthSignIn(option.provider);
                }}
              >
                {option.icon}
                Sign In With {option.label}
              </Button>
            );
          })}
        </div>
        <Separator />
        <AuthSignInMail />
      </div>
    </div>
  );
};

export default AuthSignIn;
