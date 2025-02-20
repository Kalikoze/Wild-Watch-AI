'use client'

import { motion } from 'framer-motion';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';
import { HiExclamationCircle } from 'react-icons/hi';

interface AuthErrorMessageProps {
  message?: string;
  redirectPath?: string;
  redirectText?: string;
}

export default function AuthErrorMessage({
  message,
  redirectPath = "/auth",
  redirectText = "Back to Sign Up"
}: AuthErrorMessageProps) {
  // If no message prop is provided, try to get it from URL parameters
  const errorMessage = message ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('message')
      : null) ||
    "There was a problem verifying your authentication. Please try signing in again."

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12" data-cy="auth-error-container">
      <BackgroundEffects color="orange" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative sm:max-w-xl sm:mx-auto w-full"
        data-cy="auth-error-content"
      >
        <div className="relative px-4 py-10 bg-primary-light shadow-xl sm:rounded-3xl sm:p-20 border border-neutral-dark/20">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-4">
              <HiExclamationCircle className="mx-auto h-12 w-12 text-accent-orange mb-4" data-cy="auth-error-icon" />
              <h1 className="text-2xl font-bold text-neutral-light mb-4" data-cy="auth-error-title" id="auth-error-heading">Authentication Error</h1>
            </div>
            <section role="alert" aria-labelledby="auth-error-heading">
              <p className="text-neutral-light/80 mb-8" data-cy="auth-error-message">
                {errorMessage}
              </p>
              <motion.a
                href={redirectPath}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-neutral-light bg-accent-orange-dark hover:bg-accent-orange rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                data-cy="auth-error-back-button"
              >
                {redirectText}
              </motion.a>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 