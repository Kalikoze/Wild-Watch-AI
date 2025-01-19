'use client';

import Link from 'next/link';

export default function AuthError() {
  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center">
      <h1 className="text-2xl text-neutral-light mb-4">Authentication Error</h1>
      <p className="text-neutral-light/80 mb-6">There was a problem authenticating your account.</p>
      <Link
        href="/signup"
        className="px-4 py-2 bg-accent-green text-primary rounded-lg hover:bg-accent-green-dark transition-colors"
      >
        Return to Sign Up
      </Link>
    </div>
  );
} 