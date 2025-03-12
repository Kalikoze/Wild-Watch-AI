'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { NavLink } from './NavLink';
import { AuthButtons } from './AuthButtons';
import { navItems } from './data/nav-items';

export const Navigation = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
            <span className="text-2xl font-bold">
              <span className="text-neutral-light">WildWatch </span>
              <span className="text-accent-green">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors",
                  item.highlight
                    ? 'text-accent-orange hover:text-neutral-light px-3 py-1 rounded-lg font-medium'
                    : 'text-neutral-light/80 hover:text-neutral-light'
                )}
              >
                {item.highlight ? (
                  <span className="inline-flex items-center">
                    Why WildWatch?
                    <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-primary-light border border-accent-orange/50 font-semibold">
                      Compare
                    </span>
                  </span>
                ) : (
                  item.label
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthButtons
              user={user}
              loading={loading}
              variant="desktop"
              handleSignOut={handleSignOut}
            />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            color="neutral"
            size="icon"
            className={cn(
              "md:hidden text-neutral-light hover:bg-neutral-light/10",
              "transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt4 size={24} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-primary-light border-b border-neutral-light/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {/* Mobile menu links */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut"
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center text-neutral-light/80 hover:text-neutral-light py-3 relative pl-4",
                        "after:absolute after:left-0 after:top-0 after:h-full after:w-[2px]",
                        "after:bg-accent-green after:scale-y-0 after:origin-top",
                        "hover:after:scale-y-100 after:transition-transform after:duration-300",
                        pathname === item.href && "text-neutral-light after:scale-y-100"
                      )}
                      onClick={closeMobileMenu}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Link>
                    <Separator className="bg-neutral-light/5" />
                  </motion.div>
                );
              })}

              {/* Mobile auth buttons */}
              <AuthButtons
                user={user}
                loading={loading}
                variant="mobile"
                handleSignOut={handleSignOut}
                onNavigate={closeMobileMenu}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}; 