import { motion } from 'framer-motion';
import { useState } from 'react';
import { plans } from '@/app/(marketing)/data/pricing';
import { HiCheck } from 'react-icons/hi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StepButtons } from '@/components/ui/step-buttons';
import { FormToggle } from '@/components/ui/form-toggle';
import { cn } from '@/lib/utils';
import { PlanData, PlanStepProps } from '@/app/onboarding/types';

const calculateAnnualPrice = (monthlyPrice: number, planId: string) => {
  const annualDiscount = planId === 'enterprise' ? 0.20 : 0.15;
  return (monthlyPrice * 12 * (1 - annualDiscount)).toFixed(0);
};

export default function PlanStep({
  onComplete,
  onBack,
  organizationType,
}: PlanStepProps) {
  const [planData, setPlanData] = useState<PlanData>({
    planId: 'free',
    billingCycle: 'monthly',
    organizationType
  });

  if (planData.organizationType === 'existing') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="relative py-8 sm:py-12 bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20 overflow-hidden">
          {/* Decorative gradient bar at top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green/30" />

          <CardContent className="max-w-lg mx-auto p-0 space-y-8 relative z-10">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-light">
                Welcome to Your Organization
              </h2>
              <p className="text-neutral-light/70 mt-3">
                You&apos;ll be added to your organization&apos;s existing plan
              </p>
              <StepButtons
                onNext={() => onComplete({
                  planId: 'free',
                  billingCycle: 'monthly',
                  organizationType: 'existing'
                })}
                nextLabel="Continue"
              />
            </div>
          </CardContent>
        </Card>
      </motion.article>
    );
  }

  const formatStorage = (bytes: number) => {
    const gb = bytes / 1_000_000_000;
    return gb >= 1000 ? `${gb / 1000}TB` : `${gb}GB`;
  };

  const renderPrice = (basePrice: number, planId: string) => {
    if (planData.billingCycle === 'monthly') {
      return (
        <span className="text-lg">
          ${basePrice}/mo
        </span>
      );
    }

    const annualPrice = calculateAnnualPrice(basePrice, planId);
    const monthlyWithDiscount = (Number(annualPrice) / 12).toFixed(0);

    return (
      <div className="text-right">
        <div className="text-lg">${monthlyWithDiscount}/mo</div>
        <div className="text-sm text-neutral-light/60">
          ${annualPrice}/year
        </div>
      </div>
    );
  };

  const handleChange = (changes: Partial<PlanData>) => {
    setPlanData(prev => ({ ...prev, ...changes }));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="relative py-8 sm:py-12 bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20 overflow-hidden">
        {/* Decorative gradient bar at top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green/30" />

        <CardContent className="max-w-lg mx-auto p-0 space-y-8 relative z-10">
          <header className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-light">
              Choose your plan
            </h2>
            <p className="text-neutral-light/70 text-sm mt-2">
              Start with our free trial or upgrade for more features
            </p>
          </header>

          <FormToggle
            value={planData.billingCycle}
            onChange={(billingCycle) => handleChange({ billingCycle })}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual' }
            ]}
          />

          <div className="space-y-4">
            {Object.entries(plans).map(([id, plan]) => (
              <Button
                key={id}
                type="button"
                variant="outline"
                onClick={() => handleChange({ planId: id })}
                color={planData.planId === id ? "green" : "neutral"}
                className="w-full p-4 h-auto justify-start text-left"
              >
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className={cn(
                        "font-medium transition-all",
                        planData.planId === id ? "text-accent-green" : "text-neutral-light"
                      )}>
                        {plan.name}
                      </span>
                      {id !== 'free' && planData.billingCycle === 'annual' && (
                        <span className="ml-2 text-xs px-2 py-1 bg-accent-green/10 text-accent-green rounded-full">
                          Save {id === 'enterprise' ? '20%' : '15%'}
                        </span>
                      )}
                    </div>
                    <span className={cn(
                      "font-medium transition-all",
                      planData.planId === id ? "text-accent-green" : "text-neutral-light"
                    )}>
                      {plan.basePrice === 0 ? 'Free' : renderPrice(plan.basePrice, id)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-neutral-light/60">
                    Includes {plan.includesTokens} tokens • {formatStorage(plan.storageLimit)} storage
                  </div>
                  <ul className="mt-3 space-y-1.5 border-t border-neutral-dark/10 pt-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-sm text-neutral-light/80 flex items-center gap-2">
                        <HiCheck className="text-accent-green h-4 w-4 shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Button>
            ))}
          </div>

          <StepButtons
            onBack={onBack}
            onNext={() => onComplete(planData)}
            nextLabel={planData.planId === 'free' ? 'Start Free Trial' : 'Complete Setup'}
          />

          {planData.planId !== 'free' && (
            <p className="text-center text-sm text-neutral-light/60">
              30-day money-back guarantee • Cancel anytime
            </p>
          )}
        </CardContent>
      </Card>
    </motion.article>
  );
} 