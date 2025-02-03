import { PlanTier } from "@/types/pricing";

export const plans: Record<string, PlanTier> = {
  free: {
    name: 'Free Trial',
    basePrice: 0,
    includesTokens: 100,
    features: [
      'Basic video analysis',
      'Standard reports',
      'Up to 3 team members',
      '5GB shared storage'
    ],
    storageLimit: 5_000_000_000 // 5GB
  },
  professional: {
    name: 'Professional',
    basePrice: 299,
    includesTokens: 1000,
    features: [
      'Advanced video analysis',
      'Priority support',
      'Custom reports',
      'Up to 25 team members',
      '100GB shared storage',
      'Data export'
    ],
    storageLimit: 100_000_000_000 // 100GB
  },
  enterprise: {
    name: 'Enterprise',
    basePrice: 999,
    includesTokens: 5000,
    features: [
      'Unlimited team members',
      '1TB shared storage',
      'API access',
      'Custom AI training',
      'Dedicated support',
      'Advanced analytics',
      'Priority feature requests'
    ],
    storageLimit: 1_000_000_000_000 // 1TB
  }
}

export const tokenPricing: { amount: number; price: number }[] = [
  { amount: 100, price: 49 },
  { amount: 500, price: 199 },
  { amount: 1000, price: 349 }
] 