'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';
import { AuthForm } from '@/app/auth/components/AuthForm';

export default function Auth() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12">
      <BackgroundEffects color="green" />

      {/* Blue accent in top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-96 h-96 opacity-20 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, var(--accent-blue-rgb-glow) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Container with subtle fade-in animation */}
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AuthForm />
      </motion.div>
    </main>
  );
} 