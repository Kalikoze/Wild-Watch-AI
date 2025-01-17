export interface PlanTier {
  name: string;
  basePrice: number;
  includesTokens: number;
  features: string[];
  storageLimit: number;
}