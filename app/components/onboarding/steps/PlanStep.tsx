import { motion } from 'framer-motion';
import { useState } from 'react';
import { plans } from '@/lib/data/pricing';

export type PlanData = {
  planId: string;
  billingCycle: 'monthly' | 'annual';
  organizationType: 'new' | 'existing';
};

const calculateAnnualPrice = (monthlyPrice: number, planId: string) => {
  const annualDiscount = planId === 'enterprise' ? 0.20 : 0.15;
  return (monthlyPrice * 12 * (1 - annualDiscount)).toFixed(0);
};

export function PlanStep({
  onComplete,
  onBack,
  organizationType,
}: {
  onComplete: (data: PlanData) => void;
  onBack: () => void;
  organizationType: 'new' | 'existing';
}) {
  const [planData, setPlanData] = useState<PlanData>({
    planId: 'free',
    billingCycle: 'monthly',
    organizationType: organizationType
  });

  if (planData.organizationType === 'existing') {
    return (
      <motion.div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-light">
            Welcome to Your Organization
          </h2>
          <p className="text-neutral-light/60 mt-2">
            You&apos;ll be added to your organization&apos;s existing plan
          </p>
          <button
            onClick={() => onComplete({
              planId: 'free',
              billingCycle: 'monthly',
              organizationType: 'existing'
            })}
            className="mt-6 px-4 py-3 rounded-lg bg-accent-green hover:bg-accent-green-light text-primary transition-all"
          >
            Continue
          </button>
        </div>
      </motion.div>
    );
  }

  const formatStorage = (bytes: number) => {
    const gb = bytes / 1_000_000_000;
    return gb >= 1000 ? `${gb / 1000}TB` : `${gb}GB`;
  };

  const renderPrice = (basePrice: number) => {
    if (planData.billingCycle === 'monthly') {
      return (
        <span className="text-lg">
          ${basePrice}/mo
        </span>
      );
    }

    const annualPrice = calculateAnnualPrice(basePrice, planData.planId);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative sm:max-w-xl sm:mx-auto w-full px-4"
    >
      <div className="relative px-4 py-10 bg-primary-light shadow-xl sm:rounded-3xl sm:p-20 border border-neutral-dark/20">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-neutral-light text-center">
            Choose your plan
          </h2>
          <p className="text-neutral-light/60 text-center text-sm">
            Start with our free trial or upgrade for more features
          </p>

          {planData.planId !== 'free' && (
            <div className="flex justify-center p-2 rounded-xl bg-neutral-light/5">
              <div className="flex w-full max-w-xs">
                <button
                  onClick={() => setPlanData(d => ({ ...d, billingCycle: 'monthly' }))}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${planData.billingCycle === 'monthly'
                    ? 'bg-accent-green text-neutral-light'
                    : 'text-neutral hover:text-neutral-light'
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setPlanData(d => ({ ...d, billingCycle: 'annual' }))}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${planData.billingCycle === 'annual'
                    ? 'bg-accent-green text-neutral-light'
                    : 'text-neutral hover:text-neutral-light'
                    }`}
                >
                  <div className="flex flex-col items-center">
                    <span className={`text-xs ${planData.billingCycle === 'annual'
                      ? 'text-neutral-light/80'
                      : 'text-accent-green'
                      }`}>
                      Save {planData.planId === 'enterprise' ? '20%' : '15%'}
                    </span>
                    <span>Annual</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {Object.entries(plans).map(([id, plan]) => (
              <button
                key={id}
                onClick={() => setPlanData(d => ({ ...d, planId: id }))}
                className={`w-full p-4 rounded-lg border transition-all text-left ${planData.planId === id
                  ? 'border-accent-green bg-accent-green/10'
                  : 'border-neutral-dark/30 hover:bg-neutral-light/5'
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-neutral-light">{plan.name}</span>
                  <span className={planData.planId === id ? 'text-accent-green' : 'text-neutral-light'}>
                    {plan.basePrice === 0 ? 'Free' : renderPrice(plan.basePrice)}
                  </span>
                </div>
                <div className="mt-2 text-sm text-neutral-light/60">
                  Includes {plan.includesTokens} tokens
                </div>
                <div className="mt-1 text-sm text-neutral-light/60">
                  {formatStorage(plan.storageLimit)} storage
                </div>
                <ul className="mt-2 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-neutral-light/80 flex items-center gap-2">
                      <span className="text-accent-green">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-3 rounded-lg border border-neutral-dark/30 text-neutral-light hover:bg-neutral-light/5 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => onComplete(planData)}
              className="flex-1 px-4 py-3 rounded-lg bg-accent-green hover:bg-accent-green-light text-primary transition-all"
            >
              {planData.planId === 'free' ? 'Start Free Trial' : 'Complete Setup'}
            </button>
          </div>

          {planData.planId !== 'free' && (
            <p className="text-center text-sm text-neutral-light/60">
              30-day money-back guarantee • Cancel anytime
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 