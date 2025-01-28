import { createClient } from '@/utils/supabase/client'

export async function updateOnboardingStatus(status: 'not_started' | 'in_progress' | 'completed') {
  const supabase = createClient()

  const { error } = await supabase
    .from('profiles')
    .update({
      onboarding_status: status,
      updated_at: new Date().toISOString()
    })
    .eq('id', (await supabase.auth.getUser()).data.user?.id)

  if (error) throw error
} 