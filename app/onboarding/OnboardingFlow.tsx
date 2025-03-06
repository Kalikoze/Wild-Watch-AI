'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeStep } from '@/app/onboarding/components/steps/WelcomeStep';
import OrganizationStep from '@/app/onboarding/components/steps/OrganizationStep';
import RoleStep from '@/app/onboarding/components/steps/RoleStep';
import PlanStep from '@/app/onboarding/components/steps/PlanStep';
import { useRouter } from 'next/navigation';
import { FiCheck } from 'react-icons/fi';
import { saveOnboardingData, updateOnboardingStatus } from '@/app/utils/onboarding';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { OrgData, RoleData, PlanData } from '@/app/onboarding/types';

const steps = [
  { id: 1, name: 'Welcome' },
  { id: 2, name: 'Organization' },
  { id: 3, name: 'Role' },
  { id: 4, name: 'Plan' },
];

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<{
    organization: OrgData | null;
    role: RoleData | null;
    plan: PlanData | null;
  }>({
    organization: null,
    role: null,
    plan: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      if (step === 1) {
        await updateOnboardingStatus('in_progress');
      }

      if (step === steps.length) {
        await saveOnboardingData(data);
        await updateOnboardingStatus('completed');
        toast.success('Setup completed successfully!', {
          position: 'bottom-right',
          style: {
            background: '#1E1E1E',
            color: '#28A745',
            border: '1px solid rgba(40, 167, 69, 0.2)',
          },
        });
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto w-full">
      <nav className="mb-8 sm:mb-12 px-4 sm:px-8" aria-label="Progress">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 shrink-0 transition-all duration-300",
                  step > s.id
                    ? "bg-accent-green border-accent-green"
                    : step === s.id
                      ? "border-accent-green bg-primary text-accent-green"
                      : "border-neutral-light/30 text-neutral-light/30"
                )}
              >
                {step > s.id ? (
                  <FiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                ) : (
                  <span className="text-sm font-medium">{s.id}</span>
                )}
              </div>

              <span
                className={cn(
                  "hidden sm:block ml-3 text-sm font-medium transition-all duration-300",
                  step >= s.id ? "text-neutral-light" : "text-neutral-light/30"
                )}
              >
                {s.name}
              </span>

              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 mx-2 sm:mx-4 flex-1 transition-all duration-700",
                    step > s.id ? "bg-accent-green" : "bg-neutral-light/30"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </nav>

      {isLoading && (
        <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-primary-light p-6 rounded-lg shadow-xl border border-neutral-dark/20">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-green"></div>
              <p className="text-neutral-light">Processing...</p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-[600px] px-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <WelcomeStep
              onNext={async () => {
                await handleComplete();
                setStep(2);
              }}
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
              organizationType={data.organization?.type || 'new'}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 