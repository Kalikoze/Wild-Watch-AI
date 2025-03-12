'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthForm } from '@/app/auth/components/AuthForm';

export default function Auth() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12">
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