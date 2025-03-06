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

export interface BaseStepProps {
  onBack: () => void;
}

export interface WelcomeStepProps {
  onNext: () => void;
}

export interface OrganizationStepProps extends BaseStepProps {
  onNext: (data: OrgData) => void;
}

export interface RoleStepProps extends BaseStepProps {
  onNext: (data: RoleData) => void;
}

export interface PlanStepProps {
  onComplete: (data: PlanData) => void;
  onBack: () => void;
  organizationType: OrganizationType;
} 