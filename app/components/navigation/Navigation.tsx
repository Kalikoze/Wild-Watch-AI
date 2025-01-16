'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/updates', label: 'Updates' },
  { href: '/compare', label: 'Why WildWatch?' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-neutral-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-accent-green to-accent-orange bg-clip-text text-transparent">
              Wild Watch AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
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
              </Link>
            ))}
          </div>

          {/* Updated CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/login"
              className="text-neutral-light/80 hover:text-neutral-light transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="group inline-flex items-center px-6 py-2.5 text-base font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Try for Free
              <HiCursorClick className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-neutral-light"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-neutral-light/80 hover:text-neutral-light py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-4">
                <Link
                  href="/login"
                  className="block text-neutral-light/80 hover:text-neutral-light font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="group flex items-center justify-center px-6 py-2.5 text-base font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Try for Free
                  <HiCursorClick className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 