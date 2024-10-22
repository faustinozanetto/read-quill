import React from 'react';

const AuthVerifyRequest: React.FC = () => {
  return (
    <div className="rounded border p-4 px-4 md:p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Check your Email</h1>
        <p className="max-w-md text-center">
          Check your inbox for the sign-in link we just sent. Simply click the link to securely access your account. If
          you don't see the email, be sure to check your spam or junk folder.
        </p>
      </div>
    </div>
  );
};

export default AuthVerifyRequest;
