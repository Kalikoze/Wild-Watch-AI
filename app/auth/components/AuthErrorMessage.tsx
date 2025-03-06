'use client'

import { motion } from 'framer-motion';
import { HiExclamationCircle } from 'react-icons/hi';
import { AuthErrorMessageProps } from '@/app/auth/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AuthErrorMessage({
  message,
  redirectPath = "/auth",
  redirectText = "Back to Sign Up"
}: AuthErrorMessageProps) {
  const errorMessage = message ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('message')
      : null) ||
    "There was a problem verifying your authentication. Please try signing in again."

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-xl mx-auto px-4"
        data-cy="auth-error-content"
      >
        <Card className="relative py-8 sm:py-12 bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-orange via-accent-gold/30 to-accent-orange-light" />

          <CardContent className="max-w-md mx-auto text-center p-0 relative z-10">
            <div className="mb-6">
              <HiExclamationCircle className="mx-auto h-14 w-14 text-accent-orange mb-5" data-cy="auth-error-icon" />
              <h1 className="text-2xl font-bold text-neutral-light mb-4" data-cy="auth-error-title" id="auth-error-heading">Authentication Error</h1>
            </div>

            <div className="space-y-8">
              <section role="alert" aria-labelledby="auth-error-heading">
                <p className="text-neutral-light/80 mb-8" data-cy="auth-error-message">
                  {errorMessage}
                </p>
                <Button
                  asChild
                  variant="orange"
                  size="xl"
                  className={cn(
                    "w-full transition-all duration-300",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    "shadow-[0_0_15px_rgba(255,87,34,0.15)]"
                  )}
                  data-cy="auth-error-back-button"
                >
                  <motion.a
                    href={redirectPath}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {redirectText}
                  </motion.a>
                </Button>
              </section>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
} 