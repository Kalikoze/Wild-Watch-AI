import { motion } from 'framer-motion';
import { useState } from 'react';
import { plans } from '@/lib/data/pricing';
import Button from '@/app/components/common/Button';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

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
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-light">
                Welcome to Your Organization
              </h2>
              <p className="text-neutral-light/60 mt-2">
                You&apos;ll be added to your organization&apos;s existing plan
              </p>
              <Button
                onClick={() => onComplete({
                  planId: 'free',
                  billingCycle: 'monthly',
                  organizationType: 'existing'
                })}
                variant="primary"
                icon={HiArrowRight}
                className="mt-6 !bg-accent-green hover:!bg-accent-green-light text-primary"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </motion.article>
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20">
        <div className="max-w-lg mx-auto space-y-8">
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

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Button
              onClick={onBack}
              variant="neutral"
              icon={HiArrowLeft}
              iconPosition="left"
              className="w-full sm:w-1/2"
            >
              Back
            </Button>
            <Button
              onClick={() => onComplete(planData)}
              variant="primary"
              icon={HiArrowRight}
              className="w-full sm:w-1/2 !bg-accent-green hover:!bg-accent-green-light text-primary"
            >
              {planData.planId === 'free' ? 'Start Free Trial' : 'Complete Setup'}
            </Button>
          </div>

          {planData.planId !== 'free' && (
            <p className="text-center text-sm text-neutral-light/60">
              30-day money-back guarantee • Cancel anytime
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
} 