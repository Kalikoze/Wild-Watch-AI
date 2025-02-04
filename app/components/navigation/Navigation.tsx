'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation';
import Button from '@/app/components/common/Button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/updates', label: 'Updates' },
  { href: '/compare', label: 'Why WildWatch?' },
];

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: "easeInOut"
        }
      }}
      whileTap={{
        scale: 0.95,
        color: "#28A745",
        transition: {
          duration: 0.1,
          ease: "easeOut"
        }
      }}
    >
      <Link
        href={href}
        className={`${className} relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-accent-green hover:after:w-full after:transition-all after:duration-300`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export const Navigation = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClient()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const AuthButtons = () => {
    if (loading) {
      return (
        <div className="h-8 w-24 bg-neutral-dark/20 animate-pulse rounded-lg"></div>
      );
    }
    if (user) {
      return (
        <>
          <Link
            href="/dashboard"
            className="text-accent-green hover:text-accent-green-light transition-colors"
          >
            Dashboard
          </Link>
          <Button
            onClick={handleSignOut}
            variant="secondary"
            className="!text-neutral-light !border-neutral-light/20 hover:!bg-neutral-light/10 hover:!text-neutral-light"
          >
            Sign Out
          </Button>
        </>
      );
    }

    return (
      <Button
        href="/auth"
        variant="secondary"
        icon={HiCursorClick}
      >
        Get Started
      </Button>
    );
  };

  const MobileAuthButtons = () => {
    if (loading) return null;

    return (
      <div className="pt-4 space-y-4">
        <Link
          href="/auth"
          className="block text-neutral-light/80 hover:text-neutral-light font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Sign in
        </Link>
        <Button
          href="/auth"
          variant="secondary"
          icon={HiCursorClick}
          className="w-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Try for Free
        </Button>
      </div>
    );
  };

  return (
    <nav
      className="fixed w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-neutral-light/10"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-accent-green to-accent-orange bg-clip-text text-transparent">
              Wild Watch AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                className={`
                  ${link.href === '/compare'
                    ? 'text-accent-orange hover:text-neutral-light px-3 py-1 rounded-lg font-medium'
                    : 'text-neutral-light/80 hover:text-neutral-light'
                  } 
                  transition-colors
                  ${pathname === link.href ? 'text-neutral-light' : ''}
                `}
              >
                {link.href === '/compare' ? (
                  <span className="inline-flex items-center">
                    Why WildWatch?
                    <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-accent-orange/20 border border-accent-orange/30">
                      Compare
                    </span>
                  </span>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
          </div>

          {/* Updated CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-neutral-light"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-primary-light border-b border-neutral-light/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {/* Mobile menu links */}
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <Link
                    href={link.href}
                    className="block text-neutral-light/80 hover:text-neutral-light py-2 relative pl-4
                      after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] 
                      after:bg-accent-green after:scale-y-0 after:origin-top
                      hover:after:scale-y-100 after:transition-transform after:duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <MobileAuthButtons />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 