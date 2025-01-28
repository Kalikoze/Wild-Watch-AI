'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeStep } from '@/app/components/onboarding/steps/WelcomeStep';
import { OrganizationStep } from '@/app/components/onboarding/steps/OrganizationStep';
import { RoleStep } from '@/app/components/onboarding/steps/RoleStep';
import { PlanStep } from '@/app/components/onboarding/steps/PlanStep';
import { useRouter } from 'next/navigation';

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    organization: null,
    role: null,
    plan: null
  });

  const handleComplete = async () => {
    try {
      // Save all collected data to your backend
      await saveOnboardingData(data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <WelcomeStep
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <OrganizationStep
          onNext={(orgData) => {
            setData(d => ({ ...d, organization: orgData }));
            setStep(3);
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <RoleStep
          onNext={(roleData) => {
            setData(d => ({ ...d, role: roleData }));
            setStep(4);
          }}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <PlanStep
          onComplete={async (planData) => {
            setData(d => ({ ...d, plan: planData }));
            await handleComplete();
          }}
          onBack={() => setStep(3)}
        />
      )}
    </AnimatePresence>
  );
} 