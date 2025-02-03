'use client'

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface AppNavProps {
  context?: 'dashboard' | 'onboarding';
}

export const AppNav = ({ context = 'dashboard' }: AppNavProps) => {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className={`fixed top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-neutral-light/10 
      ${context === 'dashboard' ? 'w-[calc(100%-16rem)] right-0' : 'w-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-accent-green to-accent-orange bg-clip-text text-transparent">
              Wild Watch AI
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="group inline-flex items-center px-6 py-2.5 text-base font-medium text-neutral-light border-2 border-neutral-light/20 hover:bg-neutral-light/10 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}; 