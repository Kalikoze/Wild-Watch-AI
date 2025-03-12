'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { signInWithMagicLink } from '@/app/auth/lib/magic-link';
import { signInWithGoogle } from '@/app/auth/lib/providers/google';
import { signInWithAzure } from '@/app/auth/lib/providers/azure';
import { toast } from 'react-hot-toast';
import { OAuthProvider } from '@/app/auth/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithMagicLink(email);

      toast.success('Check your email for the magic link!', {
        position: 'bottom-right',
        style: {
          background: '#1E1E1E',
          color: '#28A745',
          border: '1px solid rgba(40, 167, 69, 0.2)',
        },
      });
    } catch (error) {
      console.error('Error during sign-in with OTP:', error);
      toast.error('Failed to send magic link. Please try again.', {
        position: 'bottom-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSubmit = async (provider: OAuthProvider) => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'azure') {
        await signInWithAzure();
      }
    } catch (error) {
      console.error('Error during sign-in with OAuth:', error);
      toast.error('Failed to connect with provider. Please try again.', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto px-4"
      data-cy="auth-section"
    >
      <Card className="relative py-8 sm:py-12 bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green via-accent-blue/30 to-accent-orange" />

        <CardContent className="max-w-lg mx-auto space-y-8 p-0 sm:p-2 relative z-10">
          <div className="text-center space-y-3" data-cy="auth-header">
            <h1 className="text-3xl sm:text-4xl font-bold" data-cy="auth-title">
              <span className="sm:hidden">
                <span className="text-neutral-light">Welcome to</span><br />
                <span className="text-neutral-light">WildWatch</span>
                <span className="text-accent-green">AI</span>
              </span>
              <span className="hidden sm:inline">
                <span className="text-neutral-light">Welcome to </span>
                <span className="text-neutral-light">WildWatch </span>
                <span className="text-accent-green">AI</span>
              </span>
            </h1>
            <p className="text-neutral-light/60" data-cy="auth-subtitle">
              For wildlife professionals and sanctuary staff
            </p>
          </div>

          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6" data-cy="auth-email-form">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-neutral-light/80">
                  Work Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-neutral-light/5 border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 transition duration-300"
                  placeholder="name@organization.com"
                  required
                  data-cy="auth-email-input"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                variant="solid"
                color="green"
                icon={isLoading ? undefined : HiMail}
                className="w-full"
                data-cy="auth-email-submit"
              >
                {isLoading ? 'Sending...' : 'Continue with Email'}
              </Button>
            </form>

            <div className="relative py-4" data-cy="auth-divider">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-dark/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-primary-light text-neutral-light">Or continue with</span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0" data-cy="auth-oauth-buttons">
              <Button
                onClick={() => handleOAuthSubmit('google')}
                variant="outline"
                color="neutral"
                icon={FaGoogle}
                className="w-full sm:w-1/2"
                data-cy="auth-google-button"
              >
                Google
              </Button>
              <Button
                onClick={() => handleOAuthSubmit('azure')}
                variant="outline"
                color="neutral"
                icon={FaMicrosoft}
                className="w-full sm:w-1/2"
                data-cy="auth-microsoft-button"
              >
                Microsoft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
} 