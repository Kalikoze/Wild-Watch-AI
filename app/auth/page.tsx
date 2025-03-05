'use client';

import BackgroundEffects from '@/app/components/common/BackgroundEffects';
import { AuthForm } from '@/app/auth/components/AuthForm';

export default function Auth() {
  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12">
      <BackgroundEffects color="green" />
      <AuthForm />
    </main>
  );
} 