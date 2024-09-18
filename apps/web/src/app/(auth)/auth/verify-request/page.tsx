import type { Metadata } from 'next';
import AuthVerifyRequest from '@modules/auth/components/verify-request/auth-verify-request';

export const metadata: Metadata = {
  title: 'Verify Request',
  description:
    'Unlock a world of literary wonders at ReadQuill. Sign in to track and review your favourite books, access personalized recommendations, and join a thriving community of book enthusiasts. Your next reading adventure awaits with ReadQuill seamless sign-in experience.',
};

export default function AuthVerifyRequestPage(): React.JSX.Element {
  return <AuthVerifyRequest />;
}
