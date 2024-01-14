import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@read-quill/design-system';
import ThemeToggler from '@modules/theme/components/theme-toggler';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your ReadQuill account to unleash the full potential.',
};

export default function AuthSignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Button className="absolute left-4 top-4" asChild>
        <Link href="/">
          <svg
            className="mr-2 h-5 w-5 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
          Go Back
        </Link>
      </Button>
      <div className="absolute right-4 top-4">
        <ThemeToggler />
      </div>
    </div>
  );
}
