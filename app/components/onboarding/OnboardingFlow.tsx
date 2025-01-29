'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeStep } from '@/app/components/onboarding/steps/WelcomeStep';
import { OrganizationStep } from '@/app/components/onboarding/steps/OrganizationStep';
import { RoleStep } from '@/app/components/onboarding/steps/RoleStep';
import { PlanStep } from '@/app/components/onboarding/steps/PlanStep';
import { useRouter } from 'next/navigation';
import { FiCheck } from 'react-icons/fi';

const steps = [
  { id: 1, name: 'Welcome' },
  { id: 2, name: 'Organization' },
  { id: 3, name: 'Role' },
  { id: 4, name: 'Plan' },
];

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
    <div className="max-w-4xl mx-auto px-4">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${step > s.id 
                    ? 'bg-accent-green border-accent-green' 
                    : step === s.id
                    ? 'border-accent-green bg-primary text-accent-green'
                    : 'border-neutral-light/30 text-neutral-light/30'
                  }`}
              >
                {step > s.id ? (
                  <FiCheck className="w-6 h-6 text-primary" />
                ) : (
                  <span className="text-sm font-medium">{s.id}</span>
                )}
              </div>
              
              {/* Step Name */}
              <span 
                className={`ml-3 text-sm font-medium
                  ${step >= s.id ? 'text-neutral-light' : 'text-neutral-light/30'}`}
              >
                {s.name}
              </span>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div 
                  className={`flex-1 h-0.5 mx-4 min-w-[4rem]
                    ${step > s.id ? 'bg-accent-green' : 'bg-neutral-light/30'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
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
    </div>
  );
} 