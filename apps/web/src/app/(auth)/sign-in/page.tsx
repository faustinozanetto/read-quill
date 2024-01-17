import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@read-quill/design-system';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import AuthSignIn from '@modules/auth/components/sign-in/auth-sign-in';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Unlock a world of literary wonders at ReadQuill. Sign in to track and review your favorite books, access personalized recommendations, and join a thriving community of book enthusiasts. Your next reading adventure awaits with ReadQuill seamless sign-in experience.',
};

export default function AuthSignInPage(): React.JSX.Element {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Button asChild className="absolute left-4 top-4">
        <Link href="/">
          <svg
            className="mr-2 h-5 w-5 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <line x1="5" x2="19" y1="12" y2="12" />
            <line x1="5" x2="11" y1="12" y2="18" />
            <line x1="5" x2="11" y1="12" y2="6" />
          </svg>
          Go Back
        </Link>
      </Button>
      <div className="absolute right-4 top-4">
        <ThemeToggler size="icon" />
      </div>
      <AuthSignIn />
    </div>
  );
}
