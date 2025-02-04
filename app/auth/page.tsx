'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';
import { handleMagicLinkSignUp, handleOAuthSignUp } from './actions';
import Button from '@/app/components/common/Button';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await handleMagicLinkSignUp(email);

      setMessage({
        type: 'success',
        text: 'Check your email for the magic link!',
      });
    } catch (error) {
      console.error('Error during sign-in with OTP:', error);
      setMessage({
        type: 'error',
        text: 'Failed to send magic link. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSubmit = async (provider: 'google' | 'azure') => {
    try {
      await handleOAuthSignUp(provider);
    } catch (error) {
      console.error('Error during sign-in with OAuth:', error);
      setMessage({
        type: 'error',
        text: 'Failed to connect with provider. Please try again.',
      });
    }
  };

  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12">
      <BackgroundEffects color="green" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl mx-auto px-4"
      >
        <div className="relative py-8 sm:py-12 bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20">
          <article className="max-w-lg mx-auto space-y-8">
            <header className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent-green to-accent-orange bg-clip-text text-transparent">
                <span className="sm:hidden">
                  Welcome to<br />WildWatch AI
                </span>
                <span className="hidden sm:inline">
                  Welcome to WildWatch AI
                </span>
              </h1>
              <p className="text-neutral-light/60">
                For wildlife professionals and sanctuary staff
              </p>
            </header>

            {message && (
              <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-accent-green/20 text-accent-green' : 'bg-red-500/20 text-red-500'}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-light/80">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    placeholder="name@organization.com"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  icon={HiMail}
                  className="w-full !bg-accent-green hover:!bg-accent-green-light text-primary sm:!w-full"
                >
                  {isLoading ? 'Sending...' : 'Continue with Email'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-dark/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-primary-light text-neutral-light/60">Or continue with</span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => handleOAuthSubmit('google')}
                  variant="oauth"
                  icon={FaGoogle}
                  className="w-full px-4 py-3"
                >
                  Google
                </Button>
                <Button
                  onClick={() => handleOAuthSubmit('azure')}
                  variant="oauth"
                  icon={FaMicrosoft}
                  className="w-full px-4 py-3"
                >
                  Microsoft
                </Button>
              </div>
            </div>
          </article>
        </div>
      </motion.section>
    </main>
  );
} 