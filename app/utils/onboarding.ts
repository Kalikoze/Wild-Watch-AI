import { createClient } from '@/utils/supabase/client'

type OnboardingData = {
  organization: {
    type: 'new' | 'existing';
    name: string;
    organizationType: string;
    otherType?: string;
  } | null;
  role: {
    role: string;
    title: string;
  } | null;
  plan: {
    planId: string;
    billingCycle: 'monthly' | 'annual';
  } | null;
}

export async function updateOnboardingStatus(status: 'not_started' | 'in_progress' | 'completed') {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_status: status })
      .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (error) throw error
  } catch (error) {
    console.error('Failed to update onboarding status:', error);
    throw new Error('Unable to update progress. Please try again.');
  }
}

export async function saveOnboardingData(data: OnboardingData) {
  const supabase = createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Session expired. Please sign in again.')

    const { data: roleData, error: roleQueryError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', data.role?.role)
      .single()

    if (roleQueryError || !roleData) {
      throw new Error('Failed to validate role selection')
    }

    const orgType = data.organization?.organizationType === 'other_specify'
      ? data.organization.otherType
      : data.organization?.organizationType

    const { error } = await supabase.rpc('handle_onboarding', {
      p_user_id: user.id,
      p_org_name: data.organization?.name,
      p_org_type: orgType,
      p_subscription_tier: data.plan?.planId || 'free',
      p_role_id: roleData.id
    })

    if (error) throw error
  } catch (error) {
    console.error('Failed to save onboarding data:', error)
    throw error instanceof Error ? error : new Error('Unable to save your information')
  }
} 