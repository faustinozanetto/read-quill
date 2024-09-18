import type { Metadata } from 'next';
import AuthError from '@modules/auth/components/error/auth-error';

export const metadata: Metadata = {
  title: 'Error',
  description:
    'Unlock a world of literary wonders at ReadQuill. Sign in to track and review your favourite books, access personalized recommendations, and join a thriving community of book enthusiasts. Your next reading adventure awaits with ReadQuill seamless sign-in experience.',
};

export default function AuthErrorPage(): React.JSX.Element {
  return <AuthError />;
}
