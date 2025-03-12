import AuthErrorMessage from '@/app/auth/components/AuthErrorMessage'
import { headers } from 'next/headers'
import { AuthErrorType } from '@/app/auth/types'

export default async function AuthErrorPage() {
  const headersList = await headers()
  const errorType = headersList.get('x-auth-error-type') as AuthErrorType | null

  const getErrorMessage = (type: AuthErrorType | null) => {
    switch (type) {
      case 'expired':
        return "This login link has expired or has already been used. Please request a new one."
      case 'invalid':
        return "Invalid login link. Please request a new one."
      default:
        return "There was a problem verifying your authentication. Please try signing in again."
    }
  }

  return (
    <main className="min-h-screen h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12" data-cy="auth-error-page">

      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-96 h-96 opacity-20 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, var(--accent-orange-rgb-glow) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="container mx-auto px-4">
        <AuthErrorMessage message={getErrorMessage(errorType)} data-cy="auth-error-message" />
      </div>
    </main>
  );
} 