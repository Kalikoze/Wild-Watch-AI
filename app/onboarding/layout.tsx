'use client';

import { DashboardNav } from '@/app/components/navigation/DashboardNav';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-primary">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNav context="onboarding" />
        <main className="flex-1 overflow-y-auto pt-16 px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 