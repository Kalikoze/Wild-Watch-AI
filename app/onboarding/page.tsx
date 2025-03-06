'use client';

import { OnboardingFlow } from '@/app/onboarding/OnboardingFlow';

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <h1 className="sr-only">WildWatch AI Onboarding</h1>
        <OnboardingFlow />
      </div>
    </main>
  );
} 