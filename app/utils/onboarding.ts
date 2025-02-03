import { createClient } from '@/utils/supabase/client'

type OnboardingData = {
  organization: {
    type: 'new' | 'existing';
    name: string;
    organizationType: string;
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

  const { error } = await supabase
    .from('profiles')
    .update({
      onboarding_status: status
    })
    .eq('id', (await supabase.auth.getUser()).data.user?.id)

  if (error) throw error
}

export async function saveOnboardingData(data: OnboardingData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('No user found')

  const { data: roleData, error: roleQueryError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', data.role?.role || 'viewer')
    .single()

  if (roleQueryError) throw roleQueryError
  if (!roleData) throw new Error('Role not found')

  const { error } = await supabase.rpc('handle_onboarding', {
    p_user_id: user.id,
    p_org_name: data.organization?.name,
    p_org_type: data.organization?.organizationType,
    p_subscription_tier: data.plan?.planId || 'free',
    p_role_id: roleData.id
  })

  if (error) throw error
} 