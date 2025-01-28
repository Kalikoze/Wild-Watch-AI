'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';
import { handleMagicLinkSignUp, handleOAuthSignUp } from './actions';

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
        className="relative sm:max-w-xl sm:mx-auto w-full"
      >
        <div className="relative px-4 py-10 bg-primary-light shadow-xl sm:rounded-3xl sm:p-20 border border-neutral-dark/20">
          <article className="max-w-md mx-auto space-y-4 text-base leading-6 text-neutral-light sm:text-lg sm:leading-7">
            <header className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-green to-accent-orange bg-clip-text text-transparent">
                Welcome to WildWatch AI
              </h1>
              <p className="text-neutral-light/60 text-sm">
                For wildlife professionals and sanctuary staff
              </p>
            </header>

            {message && (
              <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-accent-green/20 text-accent-green' : 'bg-red-500/20 text-red-500'}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-6">
              {/* Email Form First */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-light/80 mb-2">
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-primary bg-accent-green hover:bg-accent-green-light transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Continue with Email'}
                  <HiMail className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-dark/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-primary-light text-neutral-light/60">Or continue with</span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleOAuthSubmit('google')}
                  className="group flex items-center justify-center px-4 py-3 bg-neutral-light/5 border border-neutral-dark/30 rounded-lg text-neutral-light hover:bg-neutral-light/10 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  <FaGoogle className="w-5 h-5 mr-2" />
                  Google
                </button>
                <button
                  onClick={() => handleOAuthSubmit('azure')}
                  className="group flex items-center justify-center px-4 py-3 bg-neutral-light/5 border border-neutral-dark/30 rounded-lg text-neutral-light hover:bg-neutral-light/10 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  <FaMicrosoft className="w-5 h-5 mr-2" />
                  Microsoft
                </button>
              </div>
            </div>
          </article>
        </div>
      </motion.section>
    </main>
  );
} 