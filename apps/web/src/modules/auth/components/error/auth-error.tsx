import { Button } from '@read-quill/design-system';
import Link from 'next/link';
import React from 'react';

const AuthError: React.FC = () => {
  return (
    <div className="rounded border p-4 px-4 shadow md:p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Oops, Error!</h1>
        <p className="max-w-md text-center">
          Oops, something went wrong during the authentication process. Please try again, and if the issue continues,
          feel free to reach out to our support team for assistance.
        </p>
        <Button asChild title="Goto Sign In">
          <Link href="/auth/sign-in">Goto Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthError;
