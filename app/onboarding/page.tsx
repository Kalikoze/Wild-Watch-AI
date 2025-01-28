'use client';

import { OnboardingFlow } from '@/app/components/onboarding/OnboardingFlow';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center relative overflow-hidden py-12">
      <BackgroundEffects color="green" />
      <OnboardingFlow />
    </main>
  );
} 