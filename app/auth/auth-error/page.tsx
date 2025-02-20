import AuthErrorMessage from '@/app/components/AuthErrorMessage'
import { headers } from 'next/headers'

export default async function AuthErrorPage() {
  const headersList = await headers()
  const errorType = headersList.get('x-auth-error-type')

  const getErrorMessage = (type: string | null) => {
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
    <main className="min-h-screen bg-primary flex items-center justify-center" data-cy="auth-error-page">
      <AuthErrorMessage message={getErrorMessage(errorType)} data-cy="auth-error-message" />
    </main>
  )
} 