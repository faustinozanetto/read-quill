import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthSignIn from '@modules/auth/components/sign-in/auth-sign-in';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Unlock a world of literary wonders at ReadQuill. Sign in to track and review your favourite books, access personalized recommendations, and join a thriving community of book enthusiasts. Your next reading adventure awaits with ReadQuill seamless sign-in experience.',
};

export default function AuthSignInPage(): React.JSX.Element {
  return (
    <Suspense>
      <AuthSignIn />
    </Suspense>
  );
}
