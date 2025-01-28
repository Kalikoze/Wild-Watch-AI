import { motion } from 'framer-motion';
import { useState } from 'react';
import { plans } from '@/lib/data/pricing';

type PlanData = {
  planId: string;
  billingCycle: 'monthly' | 'annual';
};

export function PlanStep({
  onComplete,
  onBack
}: {
  onComplete: (data: PlanData) => void;
  onBack: () => void;
}) {
  const [planData, setPlanData] = useState<PlanData>({
    planId: 'free',
    billingCycle: 'monthly'
  });

  const formatStorage = (bytes: number) => {
    const gb = bytes / 1_000_000_000;
    return gb >= 1000 ? `${gb / 1000}TB` : `${gb}GB`;
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
                    ${plan.basePrice}/mo
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

          {planData.planId !== 'free' && (
            <div className="flex justify-center gap-4 p-4 rounded-lg bg-neutral-light/5">
              <button
                onClick={() => setPlanData(d => ({ ...d, billingCycle: 'monthly' }))}
                className={`px-4 py-2 rounded-lg transition-all ${planData.billingCycle === 'monthly'
                    ? 'bg-accent-green text-primary'
                    : 'text-neutral-light hover:bg-neutral-light/5'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPlanData(d => ({ ...d, billingCycle: 'annual' }))}
                className={`px-4 py-2 rounded-lg transition-all ${planData.billingCycle === 'annual'
                    ? 'bg-accent-green text-primary'
                    : 'text-neutral-light hover:bg-neutral-light/5'
                  }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          )}

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