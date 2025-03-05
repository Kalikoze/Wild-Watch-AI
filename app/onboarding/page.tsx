'use client';

import { OnboardingFlow } from '@/app/onboarding/OnboardingFlow';

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12">
      <OnboardingFlow />
    </main>
  );
} 