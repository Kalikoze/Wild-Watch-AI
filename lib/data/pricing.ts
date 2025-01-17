import { PlanTier } from "@/types/pricing";

export const plans: Record<string, PlanTier> = {
  free: {
    name: 'Free Trial',
    basePrice: 0,
    includesTokens: 50,
    features: ['Basic video analysis', 'Standard reports'],
    storageLimit: 1_000_000_000 // 1GB
  },
  professional: {
    name: 'Professional',
    basePrice: 99,
    includesTokens: 500,
    features: ['Advanced analysis', 'Priority support', 'Custom reports'],
    storageLimit: 50_000_000_000 // 50GB
  },
  enterprise: {
    name: 'Enterprise',
    basePrice: 499,
    includesTokens: 3000,
    features: ['Unlimited storage', 'API access', 'Custom AI training'],
    storageLimit: 1_000_000_000_000 // 1 TB
  }
}

export const tokenPricing: { amount: number; price: number }[] = [
  { amount: 100, price: 49 },
  { amount: 500, price: 199 },
  { amount: 1000, price: 349 }
] 