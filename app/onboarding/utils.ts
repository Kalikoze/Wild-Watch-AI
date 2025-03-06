import { OrgData } from './types';

export function validateOrganizationData(data: OrgData): boolean {
  if (data.type === 'new') {
    const hasValidName = data.name.trim().length >= 2;

    const hasValidOrgType = data.organizationType.length > 0 &&
      data.organizationType !== 'placeholder';

    if (data.organizationType === 'other_specify') {
      const hasValidOtherType = (data.otherType?.trim()?.length ?? 0) >= 2;
      return hasValidName && hasValidOrgType && hasValidOtherType;
    }

    return hasValidName && hasValidOrgType;
  }

  // For now, always return true for existing organizations
  // We'll implement proper validation when the feature is built
  return true;
} 