import { createServer } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'

export type ProfileWithOrganization = {
  profile: any;
  organization: any | null;
}

// Fetches the profile and organization data for a user
export async function fetchDashboardData(user: User): Promise<ProfileWithOrganization | null> {
  const supabase = await createServer()

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    console.error('Error fetching profile:', profileError)
    return null
  }

  let organization = null
  if (profile.organization_id) {
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', profile.organization_id)
      .single()

    if (!orgError) {
      organization = orgData
    } else {
      console.error('Error fetching organization:', orgError)
    }
  }

  return { profile, organization }
} 