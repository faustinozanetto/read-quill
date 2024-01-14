'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import { AuthSignInOption } from '@modules/auth/types/auth.types';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { Button, useToast, GithubIcon, GoogleIcon } from '@read-quill/design-system';

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
  const { toast } = useToast();

  const handleAuthSignIn = async (provider: BuiltInProviderType) => {
    try {
      await signIn(provider, { redirect: false, callbackUrl: '/dashboard' });
    } catch (error) {
      toast({ variant: 'error', content: 'An error occurred while signing in!' });
    }
  };

  return (
    <div className="rounded border p-4 px-4 shadow md:p-6">
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
                key={option.provider}
                aria-label={`Sign In With ${option.label}`}
                onClick={async () => await handleAuthSignIn(option.provider)}
              >
                {option.icon}
                Sign In With {option.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthSignIn;
