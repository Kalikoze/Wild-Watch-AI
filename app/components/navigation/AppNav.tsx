'use client'

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useRef, useCallback } from 'react';
import {
  HiLogout,
  HiCog,
  HiSearch,
  HiBell,
  HiUser,
  HiChevronDown
} from 'react-icons/hi';
import Button from '@/app/components/common/Button';
import Tooltip from '@/app/components/common/Tooltip';
import useClickOutside from '@/app/utils/hooks/useClickOutside';

interface AppNavProps {
  context?: 'dashboard' | 'onboarding';
}

export const AppNav = ({ context = 'dashboard' }: AppNavProps) => {
  const router = useRouter();
  const supabase = createClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    if (showUserMenu) setShowUserMenu(false);
  }, [showUserMenu]);

  useClickOutside(userMenuRef, handleClickOutside);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav className={`fixed top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-neutral-light/10 
      ${context === 'dashboard' ? 'w-[calc(100%-16rem)] right-0' : 'w-full'}`}>
      <div className="max-w-full mx-auto px-12 h-20 flex items-center justify-between">
        <div className="w-96">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search videos or reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md bg-primary border border-neutral-light/20 text-neutral-light focus:border-neutral-light/40 focus:outline-none"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-light/70 w-5 h-5" />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Tooltip content="Notifications">
            <button className="relative p-2 text-neutral-light hover:text-neutral-light/80 transition-colors">
              <HiBell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-green rounded-full"></span>
            </button>
          </Tooltip>

          <Button
            href="/dashboard/settings"
            variant="neutral"
            icon={HiCog}
            iconPosition="left"
            className="px-4 py-2"
          >
            Settings
          </Button>

          <div className="relative" ref={userMenuRef}>
            <Button
              onClick={toggleUserMenu}
              variant="neutral"
              icon={HiUser}
              iconPosition="left"
              className="px-4 py-2"
            >
              Account
              <HiChevronDown className={`ml-1 w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-primary-dark border border-neutral-light/20 rounded-md shadow-lg z-50">
                <a href="/dashboard/profile" className="block px-4 py-2 text-neutral-light hover:bg-primary-light">
                  Your Profile
                </a>
                <a href="/dashboard/subscription" className="block px-4 py-2 text-neutral-light hover:bg-primary-light">
                  Subscription
                </a>
                <div className="border-t border-neutral-light/10 my-1"></div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-neutral-light hover:bg-primary-light flex items-center"
                >
                  <HiLogout className="mr-2 w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 