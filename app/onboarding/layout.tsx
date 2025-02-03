'use client';

import { AppNav } from '@/app/components/navigation/AppNav';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-primary">
      <div className="flex-1 flex flex-col">
        <AppNav context="onboarding" />
        <main className="flex-1 overflow-y-auto pt-16 px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 