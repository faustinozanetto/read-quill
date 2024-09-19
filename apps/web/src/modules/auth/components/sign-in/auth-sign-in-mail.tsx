'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import {
  Button,
  useToast,
  MailIcon,
  Form,
  FormField,
  FormItem,
  FormControl,
  Input,
  FormDescription,
  FormMessage,
  FormLabel,
} from '@read-quill/design-system';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_ACTIONS_VALIDATIONS_FORMS } from '@modules/auth/types/auth.validations';
import { SignInFormActionData } from '@modules/auth/types/auth-validations.types';

const AuthSignInMail: React.FC = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<SignInFormActionData>({ resolver: zodResolver(AUTH_ACTIONS_VALIDATIONS_FORMS.SIGN_IN) });

  const handleEmailSignIn = async (data: SignInFormActionData) => {
    try {
      const next = searchParams.get('next') ?? '/dashboard';

      await signIn('resend', { email: data.email, redirect: true, callbackUrl: next });
    } catch (error) {
      toast({ variant: 'error', content: 'An error occurred while signing in with email!' });
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 w-full" onSubmit={form.handleSubmit(handleEmailSignIn)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="yourmail@mail.com" {...field} />
              </FormControl>
              <FormDescription>Email account.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          aria-label="Sign In With Email"
          title="Sign In With Email"
          variant="outline"
        >
          <MailIcon className="mr-2" />
          Continue With Email
        </Button>
      </form>
    </Form>
  );
};

export default AuthSignInMail;
