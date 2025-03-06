/**
 * Shared types for the onboarding flow
 */

export type OrganizationType = 'new' | 'existing';

export interface OrgData {
  type: OrganizationType;
  name: string;
  organizationType: string;
  otherType?: string;
  organizationId?: string;
}

export interface RoleData {
  role: string;
  title: string;
}

export interface PlanData {
  planId: string;
  billingCycle: 'monthly' | 'annual';
  organizationType: OrganizationType;
}

export interface OnboardingStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export interface OrganizationStepProps extends OnboardingStepProps {
  onNext: (data: OrgData) => void;
}

export interface RoleStepProps extends OnboardingStepProps {
  onNext: (data: RoleData) => void;
}

export interface PlanStepProps {
  onComplete: (data: PlanData) => void;
  onBack: () => void;
  organizationType: OrganizationType;
} 